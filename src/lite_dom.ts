import LiteDOMType, { ChildrenType } from './types/lite_dom'
import PropType from './types/props'
import { joinString } from './utility'
type NodeType = HTMLElement | Text

/**
 * 根据传入的LiteDOMType对象构建dom树
 * @todo 完善props的处理
 */
export default class LiteDomNode {
  _node: NodeType
  /**
   * @constructor
   * @param domObject - LiteDOMType类型的对象
   */
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
  /**
   * @private 私有方法用于构建属性(props)
   * @param element - html元素
   * @param props - 属性对象
   */
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
  /**
   * @private 私有方法用于构建子对象
   * @param children - 子对象
   */
  private buildChildren(children: ChildrenType): Array<NodeType> {
    return children.map(dom => new LiteDomNode(dom).getNode());
  }
  public getNode(): NodeType {
    return this._node
  }
  /**
   * @deprecated
   * @param selector - 选择器
   */
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