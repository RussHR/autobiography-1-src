import React, { Component, PropTypes } from 'react';
import THREE from 'three';
import { Noise } from 'noisejs';
import isEqual from 'lodash/isEqual';

import { convertFromPerlin } from '../../utils/mathHelpers';

import './autobio-canvas.scss';

export default class AutobioCanvas extends Component {
    componentDidMount() {
        this.initializeAnimation();
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(nextProps.figureColor, this.props.figureColor)) {
            this.setFigureColor(nextProps.figureColor);
        }

        if (nextProps.windowHeight !== this.props.windowHeight || nextProps.windowWidth !== this.props.windowWidth) {
            this.resizeCanvas(nextProps.windowWidth, nextProps.windowHeight);
            this.setMeshSize(nextProps.windowWidth);
            this.setMeshBoundaries();
        }

        if (nextProps.boxIsVisible !== this.props.boxIsVisible) {
            this.boxMesh.visible = nextProps.boxIsVisible;
        }
    }

    setFigureColor({ r, g, b }) {
        this.material.color = { r: r / 255, g: g / 255, b: b / 255 };
    }

    resizeCanvas(windowWidth, windowHeight) {
        this.renderer.setSize(windowWidth, windowHeight);
        this.camera.aspect = windowWidth / windowHeight;
        this.camera.updateProjectionMatrix();
    }

    setMeshSize(windowWidth) {
        const scale = windowWidth / 6000;
        this.leftHeartMesh.scale.set(scale, scale, scale);
        this.rightHeartMesh.scale.set(scale, scale, scale);
    }

    setMeshBoundaries() {
        const vector = new THREE.Vector3();
        vector.x = 1;
        vector.y = 1;
        vector.unproject(this.camera);
        const direction = vector.sub(this.camera.position).normalize();
        const distance = -this.camera.position.z / direction.z;
        const position = this.camera.position.clone().add(direction.multiplyScalar(distance));
        const box = new THREE.Box3().setFromObject(this.rightHeartMesh);
        const maxSize = box.size().x; // x will be larger than y
        this.rightSideMaxX = position.x - maxSize;
        this.rightSideMinX = maxSize;
        this.maxY = position.y - maxSize;
    }

    initializeAnimation() {
        this.scene = new THREE.Scene();
        this.noise = new Noise(Math.random());

        this.initializeMeshes();
        this.initializeLights();
        this.initializeCamera();
        this.initializeRenderer();
        this.setMeshBoundaries();
        this.renderAnimation();
    }

    initializeMeshes() {
        const { figureColor, windowWidth, boxIsVisible } = this.props;

        const heartShape = new THREE.Shape();
        heartShape.moveTo(0, -15);
        heartShape.bezierCurveTo(25, -20, 5, -35, -30, -45);
        heartShape.bezierCurveTo(-70, -30, -55, -10, -60, 0);
        heartShape.bezierCurveTo(-55, 15, -35, 35, 0, 50);
        heartShape.bezierCurveTo(35, 40, 55, 15, 50, -5);
        heartShape.bezierCurveTo(55, -5, 55, -40, 25, -40);
        heartShape.bezierCurveTo(15, -45, 0, -15, 5, -20);

        const extrudeSettings = {
            curveSegments: 12,
            steps: 2,
            amount: 12,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSegments: 2,
            bevelSize: 1
        };

        const heartGeometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
        const boxGeometry =  new THREE.BoxGeometry(5, 5, 5);
        const color = new THREE.Color(figureColor.r / 255, figureColor.g / 255, figureColor.b / 255);
        this.material = new THREE.MeshBasicMaterial({ color });
        this.leftHeartMesh = new THREE.Mesh(heartGeometry, this.material);
        this.rightHeartMesh = new THREE.Mesh(heartGeometry, this.material);
        this.boxMesh = new THREE.Mesh(boxGeometry, this.material);
        this.boxMesh.visible = boxIsVisible;
        this.setMeshSize(windowWidth);
        this.scene.add(this.leftHeartMesh, this.rightHeartMesh, this.boxMesh);
    }

    initializeLights() {
        const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.7 );
        directionalLight.position.set(60, 60, 60);
        this.scene.add(directionalLight);

        const ambientLight = new THREE.AmbientLight(0x4B4B4B);
        this.scene.add(ambientLight);
    }

    initializeCamera() {
        const { windowHeight, windowWidth } = this.props;
        this.camera = new THREE.PerspectiveCamera(50, windowWidth / windowHeight, 0.1, 1000);
        this.camera.position.z = 120;
        this.camera.lookAt(this.scene.position);
    }

    initializeRenderer() {
        const { windowHeight, windowWidth } = this.props;
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(windowWidth, windowHeight);

        this.el.appendChild(this.renderer.domElement);
        this.renderer.render(this.scene, this.camera);
    }

    setHeartRotation(perlinTime) {
        this.leftHeartMesh.rotation.x =
            convertFromPerlin(0, Math.PI * 2, this.noise.perlin3(perlinTime, 1, 1)) + Math.PI;
        this.leftHeartMesh.rotation.y = convertFromPerlin(0, Math.PI * 2, this.noise.perlin3(1, perlinTime, 1));
        this.leftHeartMesh.rotation.z = convertFromPerlin(0, Math.PI * 2, this.noise.perlin3(1, 1, perlinTime));

        this.rightHeartMesh.rotation.x =
            convertFromPerlin(0, Math.PI * 2, this.noise.perlin3(perlinTime, 1000, 1000)) + Math.PI;
        this.rightHeartMesh.rotation.y =
            convertFromPerlin(0, Math.PI * 2, this.noise.perlin3(1000, perlinTime, 1000)) + Math.PI;
        this.rightHeartMesh.rotation.z = convertFromPerlin(0, Math.PI * 2, this.noise.perlin3(1000, 1000, perlinTime));
    }

    moveBoxVertices() {
        const leftX = this.leftHeartMesh.position.x;
        const rightX = this.rightHeartMesh.position.x;
        const leftY = this.leftHeartMesh.position.y;
        const rightY = this.rightHeartMesh.position.y;
        const yOffset = 0.005 * this.props.windowWidth;

        this.boxMesh.geometry.vertices.forEach((vertex, index) => {
            switch (index) {
                case 0:
                    vertex.x = rightX;
                    vertex.y = rightY + yOffset;
                    break;
                case 1:
                    vertex.x = rightX;
                    vertex.y = rightY + yOffset;
                    break;
                case 2:
                    vertex.x = rightX;
                    vertex.y = rightY - yOffset;
                    break;
                case 3:
                    vertex.x = rightX;
                    vertex.y = rightY - yOffset;
                    break;
                case 4:
                    vertex.x = leftX;
                    vertex.y = leftY + yOffset;
                    break;
                case 5:
                    vertex.x = leftX;
                    vertex.y = leftY + yOffset;
                    break;
                case 6:
                    vertex.x = leftX;
                    vertex.y = leftY - yOffset;
                    break;
                case 7:
                    vertex.x = leftX;
                    vertex.y = leftY - yOffset;
                    break;
            }
        });

        this.boxMesh.geometry.verticesNeedUpdate = true;
    }

    renderAnimation(timestamp) {
        let perlinTime = timestamp || 0;
        perlinTime /= 2500;
        const perlinXRightSide = this.noise.perlin2(perlinTime, 1),
              perlinYRightSide = this.noise.perlin2(1, perlinTime),
              perlinXLeftSide = this.noise.perlin2(perlinTime, 1000),
              perlinYLeftSide = this.noise.perlin2(1000, perlinTime);
        this.leftHeartMesh.position.x = convertFromPerlin(-this.rightSideMaxX, -this.rightSideMinX, perlinXLeftSide);
        this.leftHeartMesh.position.y = convertFromPerlin(-this.maxY, this.maxY, perlinYLeftSide);
        this.rightHeartMesh.position.x = convertFromPerlin(this.rightSideMinX, this.rightSideMaxX, perlinXRightSide);
        this.rightHeartMesh.position.y = convertFromPerlin(-this.maxY, this.maxY, perlinYRightSide);
        this.setHeartRotation(perlinTime);

        if (this.props.boxIsVisible) {
            this.moveBoxVertices();
        }

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame((timestamp) => this.renderAnimation(timestamp));
    }

    render() {
        return <div className="autobio-canvas-wrapper" ref={c => this.el = c} />;
    }
}

AutobioCanvas.propTypes = {
    windowHeight: PropTypes.number.isRequired,
    windowWidth: PropTypes.number.isRequired,
    figureColor: PropTypes.shape({
        r: PropTypes.number.isRequired,
        g: PropTypes.number.isRequired,
        b: PropTypes.number.isRequired
    }).isRequired,
    boxIsVisible: PropTypes.bool
};

AutobioCanvas.defaultProps = {
    boxIsVisible: false
};