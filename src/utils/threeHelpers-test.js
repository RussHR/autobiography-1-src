import { expect } from 'chai';
import sinon from 'sinon';
import { objectToCssColor, randomRGB } from './threeHelpers';

describe('threeHelpers', () => {
    describe('objectToCssColor', () => {
        it('returns a color in CSS format from an object with r, g, b properties', () => {
            const color = { r: 100, g: 23, b: 205 };
            expect(objectToCssColor(color)).to.equal('rgb(100, 23, 205)');
        });
    });

    describe('randomRGB', () => {
        it('returns an object with r, g, and b values that are a result of Math.random()', () => {
            sinon.stub(Math, 'random').returns(0.5);
            expect(randomRGB()).to.deep.equal({ r: 128, g: 128, b: 128 });
            Math.random.restore();
        });
    });
});