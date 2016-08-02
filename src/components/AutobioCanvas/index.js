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
    }

    setFigureColor({ r, g, b }) {
        this.material.color = { r: r / 255, g: g / 255, b: b / 255 };
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
        const geometry = new THREE.TetrahedronGeometry(10);
        const color = new THREE.Color(figureColor.r / 255, figureColor.g / 255, figureColor.b / 255);
        this.material = new THREE.MeshBasicMaterial({ color });
        const mesh = new THREE.Mesh(geometry, this.material);
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