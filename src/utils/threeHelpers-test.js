import { expect } from 'chai';
import sinon from 'sinon';
import { randomRGB } from './threeHelpers';

describe('threeHelpers', () => {
    describe('randomRGB', () => {
        it('returns an object with r, g, and b values that are a result of Math.random()', () => {
            sinon.stub(Math, 'random').returns(0.5);
            expect(randomRGB()).to.deep.equal({ r: 0.5, g: 0.5, b: 0.5 });
            Math.random.restore();
        });
    });
});