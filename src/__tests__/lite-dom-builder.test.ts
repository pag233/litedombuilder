
import LiteDomBuilder from '../lite-dom-builder'
import EmmetParser from '../emmet-parser'

import $ from 'jquery';

describe('happy path testing for lite-dom-builder class ', () => {
  let builder: LiteDomBuilder;
  const rootId = 'root'
  let rootElem: HTMLElement | null;
  beforeEach(() => {
    // tear down context;
    // clear root element;
    rootElem = document.getElementById(rootId);
    if (rootElem) {
      rootElem.remove();
    }
    // setup context;
    builder = new LiteDomBuilder(EmmetParser.getParser());
    rootElem = document.createElement('div');
    rootElem.id = rootId
    document.documentElement.append(rootElem);
  })
  test('append 2 child to #root element', () => {
    builder.append('#root', 'div*2');
    expect(rootElem?.childElementCount).toEqual(2);
  })
  test('add and remove event listener', () => {
    const clickListener: EventListenerObject = {
      handleEvent() {
        return
      }
    }
    const spy = jest.spyOn(clickListener, 'handleEvent');
    builder.append('#root', 'div.foo').on('click', clickListener);
    $('.foo').trigger('click');
    expect(spy).toBeCalled();
    builder.off('click', clickListener);
    $('.foo').trigger('click');
    expect(spy).toBeCalledTimes(1);
  })
  test('set attributes', () => {
    builder.build('div').attrs({
      "class": "foo",
      "id": "bar"
    }).append('#root');
    expect($('.foo').attr('id')).toEqual('bar');
    builder.attrs({
      ".foo": {
        id: "baz"
      }
    })
    expect($('.foo').attr('id')).toEqual('baz');
  })
  test('append text', () => {
    builder.build('div.foo').append('#root').text('foobar');
    expect($('.foo').text()).toEqual('foobar');
  })
})