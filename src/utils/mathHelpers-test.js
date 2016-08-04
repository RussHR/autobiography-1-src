import { expect } from 'chai';
import { convertFromPerlin } from './mathHelpers';

describe('mathHelpers', () => {
    describe('convertFromPerlin', () => {
        it('converts from a Perlin range value to a new range value', () => {
            expect(convertFromPerlin(-5, 25, 0.5)).to.equal(17.5);
        });
    });
});