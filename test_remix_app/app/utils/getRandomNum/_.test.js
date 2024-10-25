import {getRandomNum} from '.';

describe('utils/getRandomNum', () => {
  it('should return number', () => {
    const shouldBeANumber = typeof getRandomNum(0, 5) === 'number';
    expect(shouldBeANumber).toBe(true);
  });

  it('should return number in range', () => {
    const shouldBeANumberInRange = getRandomNum(3, 5);
    expect(shouldBeANumberInRange).toBeGreaterThan(2);
    expect(shouldBeANumberInRange).toBeLessThan(6);
  });
});
