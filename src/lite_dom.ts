import LiteDOMType, { ChildrenType } from './types/lite_dom'
import PropType from './types/props'
import { joinString } from './utility'
type NodeType = HTMLElement | Text

export default class LiteDomNode {
  _node: NodeType
  constructor(domObject: LiteDOMType | string) {
    if (typeof domObject === 'string') {
      this._node = document.createTextNode(domObject);
    } else {
      const { tag, props, children } = domObject;
      const element = document.createElement(tag);
      if (props != undefined) {
        this.buildProps(element, props);
      }
      if (children != undefined) {
        const childrenElements = this.buildChildren(children);
        element.append(...childrenElements);
      }
      this._node = element
    }
  }
  private buildProps(element: HTMLElement, props: PropType) {
    for (const prop in props) {
      const propString = joinString(props[prop]);
      if (prop === 'classType') {
        element.setAttribute('class', propString);
      } else {
        element.setAttribute(prop, propString);
      }
    }
  }
  private buildChildren(children: ChildrenType): Array<NodeType> {
    return children.map(dom => new LiteDomNode(dom).getNode());
  }
  private getNode(): NodeType {
    return this._node
  }
  mount(selector: string) {
    try {
      const dock = document.querySelector(selector);
      if (dock == undefined) {
        throw Error("Mount element not found.");
      }
      dock.appendChild(this._node);
    } catch (error) {
      throw error
    }
  }
}