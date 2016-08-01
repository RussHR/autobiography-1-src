import React, { Component } from 'react';
import bowser from 'bowser';
import { objectToCssColor, randomRGB } from '../../utils/threeHelpers';
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
            showStats: false
        };

        this._handleKeyup = this.handleKeyup.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keyup', this._handleKeyup);
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this._handleKeyup);
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

    toggleMenu() {
        this.setState({ menuIsOpen: !this.state.menuIsOpen });
    }

    changeColor(leftColor, rightColor, figureColor) {
        this.setState({ leftColor, rightColor, figureColor });
    }

    render() {
        const { leftColor, rightColor, figureColor, menuIsOpen, menuHasDisplayNone } = this.state;

        const leftColorStyle = { backgroundColor: objectToCssColor(leftColor) };
        const rightColorStyle = { backgroundColor: objectToCssColor(rightColor) };

        return (
            <div className="autobiography-1">
                <div className="autobiography-1-bg" style={leftColorStyle} />
                <div className="autobiography-1-bg" style={rightColorStyle} />
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