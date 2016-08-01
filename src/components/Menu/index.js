import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { randomRGB } from '../../utils/threeHelpers';
// import ColorInput from '../ColorInput';

import './menu.scss';

export default function Menu(props) {
    const {
        isOpen,
        hasDisplayNone,
        // leftColor,
        // rightColor,
        // figureColor,
        isMobile,
        onClickToggleMenuOpen,
        onChangeColor
    } = props;
    const menuClassNames = classNames('menu', { 'is-open': isOpen, 'is-hidden': hasDisplayNone });
    const controlClassNames = classNames({ 'is-hidden': isMobile });

    const colorInputs = [];
    // ['top', 'bottom'].forEach((orientation, orientationIndex) => {
    //     ['red', 'green', 'blue'].forEach((color, colorIndex) => {
    //         colorInputs.push(
    //             <ColorInput orientation={orientation}
    //                         color={color}
    //                         topColor={topColor}
    //                         bottomColor={bottomColor}
    //                         onChange={onChangeColor}
    //                         isMobile={isMobile}
    //                         key={`${orientationIndex}${colorIndex}`} />
    //         );
    //     });
    // });

    return (
        <div className={menuClassNames}>
            <div className="menu-open" onClick={onClickToggleMenuOpen}>
                menu
            </div>
            <div className="menu-contents">
                <div className="menu-close" onClick={onClickToggleMenuOpen}>
                    X
                </div>

                <h3 className="menu-title menu-background">autobiography 1</h3>

                <p className="menu-background">
                    made by <a href="http://www.russrinzler.com" target="_blank">Russ Rinzler</a>.
                    <br />
                    click <a href="https://github.com/RussHR/autobiography-1-src" target="_blank">here</a> for the code.
                    <br />
                    <span className={controlClassNames}>
                        controls
                        <br />
                        j: toggle menu visibility
                        <br />
                        k: randomize colors
                    </span>
                </p>

                <button onClick={() => onChangeColor(randomRGB(), randomRGB(), randomRGB())}>
                    randomize colors
                </button>

                <br /><br />

                {colorInputs}
            </div>
        </div>
    );
}

Menu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    hasDisplayNone: PropTypes.bool.isRequired,
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
    isMobile: PropTypes.bool,
    onClickToggleMenuOpen: PropTypes.func.isRequired,
    onChangeColor: PropTypes.func.isRequired
};