import {isNull, notNull} from '.';

describe('utils/null', () => {
  it('isNull should return true', () => {
    const shouldBeTrue = isNull(null);
    expect(shouldBeTrue).toBe(true);
  });

  it('isNull should return true', () => {
    const shouldBeFalse = isNull('not null');
    expect(shouldBeFalse).toBe(false);
  });

  it('notNull should return true', () => {
    const shouldBeTrue = notNull('not null');
    expect(shouldBeTrue).toBe(true);
  });

  it('notNull should return true', () => {
    const shouldBeFalse = notNull(null);
    expect(shouldBeFalse).toBe(false);
  });
});
