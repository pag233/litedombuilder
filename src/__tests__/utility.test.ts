import { joinString } from '../utility'
import { LiteralOrArray } from '../types/common'


describe('joinString', () => {
  test('when passing a string should return as it is.', () => {
    const str = 'test string';
    expect(joinString(str)).toEqual(str);
  })

  const mixArray = [1, 'foo', 'bar', 3];
  test('when passing a mixing array should return as a joined string', () => {
    const result = '1 foo bar 3';
    expect(joinString(mixArray)).toEqual(result);
  })
  test('should return a joined string using proper seperator', () => {
    const result = '1-foo-bar-3';
    const sep = '-'
    expect(joinString(mixArray, sep)).toEqual(result);
  })

  test('when passing empty array should return empty string', () => {
    const emptyArray: LiteralOrArray = [];
    const result = '';
    expect(joinString(emptyArray)).toEqual(result);
  })
})