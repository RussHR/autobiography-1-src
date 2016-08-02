import React, { Component, PropTypes } from 'react';
import THREE from 'three';

import './autobio-canvas.scss';

export default class AutobioCanvas extends Component {
    componentDidMount() {
        this.initializeAnimation();
    }

    initializeAnimation() {
        this.scene = new THREE.Scene();

        this.initializeCamera();
        this.initializeRenderer();
        this.renderAnimation();
    }

    initializeCamera() {
        const { windowHeight, windowWidth } = this.props;
        this.camera = new THREE.PerspectiveCamera(50, windowWidth / windowHeight, 0.1, 1000);
        this.camera.position.x = 120;
        this.camera.lookAt(this.scene.position);
    }

    initializeRenderer() {
        const { windowHeight, windowWidth } = this.props;
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
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
    windowWidth: PropTypes.number.isRequired
};