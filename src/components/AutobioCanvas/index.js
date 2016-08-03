import React, { Component, PropTypes } from 'react';
import THREE from 'three';
import isEqual from 'lodash/isEqual';

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

    initializeAnimation() {
        this.scene = new THREE.Scene();

        this.initializeMeshes();
        this.initializeLights();
        this.initializeCamera();
        this.initializeRenderer();
        this.renderAnimation();
    }

    initializeMeshes() {
        const { figureColor } = this.props;

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

        const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
        const color = new THREE.Color(figureColor.r / 255, figureColor.g / 255, figureColor.b / 255);
        this.material = new THREE.MeshBasicMaterial({ color });
        const mesh = new THREE.Mesh(geometry, this.material);
        mesh.scale.set(0.15, 0.15, 0.15);
        mesh.rotation.x = Math.PI;
        mesh.rotation.y = Math.PI / 2;
        this.scene.add(mesh);

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
        this.camera.position.x = 120;
        this.camera.lookAt(this.scene.position);
    }

    initializeRenderer() {
        const { windowHeight, windowWidth } = this.props;
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(windowWidth, windowHeight);

        this.el.appendChild(this.renderer.domElement);
        this.renderer.render(this.scene, this.camera);
    }

    renderAnimation() {
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.renderAnimation());
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
    }).isRequired
};