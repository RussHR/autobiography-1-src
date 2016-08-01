import React, { Component } from 'react';
import { randomRGB } from '../../utils/threeHelpers';

export default class Autobiography1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            leftColor: randomRGB(),
            rightColor: randomRGB()
        };
    }

    render() {
        return (
            <div>
                I am the app!
            </div>
        );
    }
}