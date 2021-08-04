import { DomObjectBuilder } from '../dom-object-builder';
import { DomObjectType } from '../types/lite-dom.type';

describe('test dom object builder', () => {
  let builder: DomObjectBuilder;
  beforeEach(() => {
    builder = new DomObjectBuilder({ tag: 'div' });
  })
  test('happy path test', () => {
    builder.setProps({
      classType: 'foo',
      style: "color:red;width:100px"
    })
    const subBuilderA = new DomObjectBuilder({
      tag: 'div',
      props: {
        classType: 'bar'
      }
    })
    const subBuilderB = new DomObjectBuilder({
      tag: 'div',
      props: {
        classType: 'baz'
      }
    })
    builder.append(subBuilderA).append(subBuilderB);
    const domObj = builder.getDomObject();
    expect(domObj.children).toHaveLength(2);
    const divDomObj = domObj?.children?.[0] as DomObjectType
    expect(divDomObj.props?.classType === 'foo')
  })
  test('test times method', () => {
    const domObjects = builder.times(5);
    expect(domObjects).toHaveLength(5);
    for (const dom of domObjects) {
      expect(dom.tag).toEqual('div');
    }
  })
})