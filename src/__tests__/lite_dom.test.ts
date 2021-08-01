/**
 * @jest-environment jsdom
 */

import { LiteDomNode } from '../lite_dom'
import { DomObjectType } from '../types/lite_dom'

describe('happy path testing', () => {
  const id = 'root';
  const outerText = 'outer text';
  const h2Text = 'title';
  const innerText = 'inner text';
  const innerClass = ['bar', 'baz'];

  const domObject: DomObjectType = {
    tag: 'div',
    props: {
      classType: 'foo',
      id,
      style: "color: red"
    },
    children: [
      outerText, {
        tag: 'h2',
        children: [
          h2Text
        ]
      }, {
        tag: 'div',
        props: {
          classType: innerClass
        },
        children: [innerText]
      }
    ]
  }
  const node = new LiteDomNode(domObject).getNodes() as HTMLElement;

  test('test id', () => {
    expect(node.id).toEqual(id);
    expect(node.childNodes[0].nodeValue).toEqual(outerText);
  })
  test('test h2 inner text', () => {
    const h2 = node.querySelector('h2') as HTMLElement;
    expect(h2.textContent).toEqual(h2Text);
  })
  test('test inner div class name', () => {
    const innerDiv = node.querySelector('.bar');
    expect(innerDiv?.className).toContain('baz');
  })
  test('test inilne style porp', () => {
    expect(node.style.color).toEqual('red');
  })
})