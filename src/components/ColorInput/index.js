import React, { PropTypes } from 'react';
import lodashAssign from 'lodash/assign';

export default function ColorInput(props) {
    const { role, hue, leftColor, rightColor, figureColor, onChange, isMobile } = props;
    const colorToControl = props[`${role}Color`];
    const hueLetter = hue[0];

    const onChangeColor = (e) => {
        if (role === 'left') {
            onChange(
                lodashAssign({}, leftColor, { [hueLetter]: (parseInt(e.target.value) || 0) }),
                rightColor,
                figureColor
            );
        } else if (role === 'right') {
            onChange(
                leftColor,
                lodashAssign({}, rightColor, { [hueLetter]: (parseInt(e.target.value) || 0) }),
                figureColor
            );
        } else { // color is for figure
            onChange(
                leftColor,
                rightColor,
                lodashAssign({}, figureColor, { [hueLetter]: (parseInt(e.target.value) || 0) })
            );
        }
    };

    const numberInput = isMobile ? null : (
        <input type="number"
               min="0"
               max="255"
               name={`${role}-color`}
               value={colorToControl[hueLetter]}
               onChange={onChangeColor} />
    );

    return (
        <div>
            <label className="menu-background" htmlFor={`${role}-color-${hueLetter}`}>
                {role} color {hue}{' '}
            </label>
            <input type="range"
                   id={`${role}-color-${hueLetter}`}
                   min="0"
                   max="255"
                   name={`${role}-color`}
                   value={colorToControl[hueLetter]}
                   onChange={onChangeColor}
                   step="1" />
            {numberInput}
            <br /><br />
        </div>
    );
}

ColorInput.propTypes = {
    role: PropTypes.oneOf(['left', 'right', 'figure']),
    hue: PropTypes.oneOf(['red', 'green', 'blue']),
    onChange: PropTypes.func.isRequired,
    leftColor: PropTypes.shape({
        r: PropTypes.number.isRequired,
        g: PropTypes.number.isRequired,
        b: PropTypes.number.isRequired
    }),
    rightColor: PropTypes.shape({
        r: PropTypes.number.isRequired,
        g: PropTypes.number.isRequired,
        b: PropTypes.number.isRequired
    }),
    figureColor: PropTypes.shape({
        r: PropTypes.number.isRequired,
        g: PropTypes.number.isRequired,
        b: PropTypes.number.isRequired
    }),
    isMobile: PropTypes.bool
};