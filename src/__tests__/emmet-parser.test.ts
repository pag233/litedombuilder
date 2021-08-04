import EmmetParser from '../emmet-parser';
import { DomObjectType } from '../types/lite-dom.type';

describe('test emmet abbreviations parser', () => {
  let parser: EmmetParser;
  beforeEach(() => {
    parser = new EmmetParser();
  })

  test('test nest structure', () => {
    const emmet = 'div>div*2>div*3'
    const builders = parser._parseLine(emmet);
    const domObjects = builders.map(builder => builder.getDomObject())
    expect(domObjects).toHaveLength(1);
    for (const domObject of domObjects) {
      const children = domObject.children as DomObjectType[];
      expect(children).toHaveLength(2);
      for (const domObject of children) {
        expect(domObject.children).toHaveLength(3);
      }
    }
  })

  test('test unit expand', () => {
    const times = 2
    const unitEmmet = `div*${times}`
    const expandedArray = parser._parseUnit(unitEmmet).map(builder => builder.getDomObject());
    expect(expandedArray).toHaveLength(times);
  })

  test('test parseWord to parse porps and content', () => {
    const tag = 'my-t123ag123';
    const props = 'class="foo" id=bar disabled';
    const content = '$content';
    const emmet = `${tag}[${props}]{${content}}`;
    const domObj = parser._parseWord(emmet, 1)[0].getDomObject();
    expect(domObj.tag).toEqual(tag);
    expect(domObj.props).toEqual({
      class: "foo",
      id: "bar",
      disabled: true
    });
    expect(domObj.children).toHaveLength(1);
    expect(domObj?.children?.[0]).toEqual('1content');
  })
})