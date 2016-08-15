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

        const leftColor = randomRGB();
        const rightColor = randomRGB();
        const figureColor = {
            r: parseInt((leftColor.r + rightColor.r) / 2),
            g: parseInt((leftColor.g + rightColor.g) / 2),
            b: parseInt((leftColor.b + rightColor.b) / 2),
        };

        this.state = {
            leftColor,
            rightColor,
            figureColor,
            menuIsOpen: false,
            menuHasDisplayNone: false,
            showStats: false,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            boxIsVisible: false
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
                this.setRandomColor();
                break;
            case 76: // 'l' key
                this.toggleBox();
                break;
        }
    }

    setRandomColor() {
        const leftColor = randomRGB();
        const rightColor = randomRGB();
        const figureColor = {
            r: parseInt((leftColor.r + rightColor.r) / 2),
            g: parseInt((leftColor.g + rightColor.g) / 2),
            b: parseInt((leftColor.b + rightColor.b) / 2),
        };
        this.changeColor(leftColor, rightColor, figureColor);
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

    toggleBox() {
        this.setState({ boxIsVisible: !this.state.boxIsVisible });
    }

    render() {
        const {
            leftColor,
            rightColor,
            figureColor,
            menuIsOpen,
            menuHasDisplayNone,
            windowWidth,
            windowHeight,
            boxIsVisible
        } = this.state;

        const leftColorStyle = { backgroundColor: objectToCssColor(leftColor) };
        const rightColorStyle = { backgroundColor: objectToCssColor(rightColor) };

        return (
            <div className="autobiography-1">
                <div className="autobiography-1-bg" style={leftColorStyle} />
                <div className="autobiography-1-bg" style={rightColorStyle} />
                <AutobioCanvas windowHeight={windowHeight}
                               windowWidth={windowWidth}
                               figureColor={figureColor}
                               boxIsVisible={boxIsVisible} />
                <Menu isOpen={menuIsOpen}
                      hasDisplayNone={menuHasDisplayNone}
                      leftColor={leftColor}
                      rightColor={rightColor}
                      figureColor={figureColor}
                      isMobile={bowser.mobile || bowser.tablet}
                      onClickToggleMenuOpen={() => this.toggleMenu()}
                      onChangeColor={(lColor, rColor, figureColor) => this.changeColor(lColor, rColor, figureColor)}
                      onClickToggleBox={() => this.toggleBox()} />
            </div>
        );
    }
}