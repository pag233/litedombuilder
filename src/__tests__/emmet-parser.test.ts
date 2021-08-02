import EmmetParser from '../emmet-parser';

describe('test Emment abbreviations parser', () => {
  test('test 1', () => {
    const parser = new EmmetParser();
    const emmet = '(div>(ul>li*3)+(p+div)*3)*2';
    // const emmet = '((h1+h2)+(h3+h4))*3';
    parser.parse(emmet);
    expect(1).toEqual(2);
  })
})