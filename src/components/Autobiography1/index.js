import React, { Component } from 'react';
import { objectToCssColor, randomRGB } from '../../utils/threeHelpers';

import './autobiography-1.scss';

export default class Autobiography1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            leftColor: randomRGB(),
            rightColor: randomRGB()
        };
    }

    render() {
        const { leftColor, rightColor } = this.state;

        const leftColorStyle = { backgroundColor: objectToCssColor(leftColor) };
        const rightColorStyle = { backgroundColor: objectToCssColor(rightColor) };

        return (
            <div className="autobiography-1">
                <div className="autobiography-1-bg" style={leftColorStyle} />
                <div className="autobiography-1-bg" style={rightColorStyle} />
            </div>
        );
    }
}