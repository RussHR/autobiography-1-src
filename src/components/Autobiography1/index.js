import React, { Component } from 'react';
import bowser from 'bowser';
import throttle from 'lodash/throttle';
import { objectToCssColor, randomRGB } from '../../utils/threeHelpers';
import AutobioCanvas from '../AutobioCanvas';
import Menu from '../Menu';

import './autobiography-1.scss';

export default class Autobiography1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            leftColor: randomRGB(),
            rightColor: randomRGB(),
            figureColor: randomRGB(),
            menuIsOpen: false,
            menuHasDisplayNone: false,
            showStats: false,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        };

        this._handleKeyup = this.handleKeyup.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keyup', this._handleKeyup);

        this._onWindowResize = throttle(() => this.onWindowResize(), 16.667);
        window.addEventListener('resize', this._onWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this._handleKeyup);
        window.removeEventListener('resize', this._onWindowResize);
    }

    handleKeyup(e) {
        switch (e.keyCode) {
            case 74: // 'j' key
                this.setState({ menuHasDisplayNone: !this.state.menuHasDisplayNone });
                break;
            case 75: // 'k' key
                this.changeColor(randomRGB(), randomRGB(), randomRGB());
                break;
        }
    }

    onWindowResize() {
        const windowHeight = window.innerHeight,
              windowWidth = window.innerWidth;

        this.setState({ windowHeight, windowWidth });
    }

    toggleMenu() {
        this.setState({ menuIsOpen: !this.state.menuIsOpen });
    }

    changeColor(leftColor, rightColor, figureColor) {
        this.setState({ leftColor, rightColor, figureColor });
    }

    render() {
        const {
            leftColor,
            rightColor,
            figureColor,
            menuIsOpen,
            menuHasDisplayNone,
            windowWidth,
            windowHeight
        } = this.state;

        const leftColorStyle = { backgroundColor: objectToCssColor(leftColor) };
        const rightColorStyle = { backgroundColor: objectToCssColor(rightColor) };

        return (
            <div className="autobiography-1">
                <div className="autobiography-1-bg" style={leftColorStyle} />
                <div className="autobiography-1-bg" style={rightColorStyle} />
                <AutobioCanvas windowHeight={windowHeight} windowWidth={windowWidth} figureColor={figureColor} />
                <Menu isOpen={menuIsOpen}
                      hasDisplayNone={menuHasDisplayNone}
                      leftColor={leftColor}
                      rightColor={rightColor}
                      figureColor={figureColor}
                      isMobile={bowser.mobile || bowser.tablet}
                      onClickToggleMenuOpen={() => this.toggleMenu()}
                      onChangeColor={(lColor, rColor, figureColor) => this.changeColor(lColor, rColor, figureColor)} />
            </div>
        );
    }
}