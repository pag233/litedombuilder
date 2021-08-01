import { DomObjectType, ChildrenType, LiteDomType, NodeType } from './types/lite_dom'
import PropType from './types/props'
import { joinString } from './utility'
/**
 * 根据传入的DomObjectType对象构建dom树
 * @todo 完善props的处理
 */
export class LiteDomNode implements LiteDomType {
  _node: NodeType
  /**
   * @constructor
   * @param domObject - DomObjectType类型的对象
   */
  constructor(domObject: DomObjectType | string) {
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
    return children.map(dom => new LiteDomNode(dom).getNodes());
  }
  getNodes(): NodeType {
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

export class LiteDomNodeList implements LiteDomType {
  _nodes: NodeType[]
  constructor(domObjectList: Array<DomObjectType | string>) {
    this._nodes = domObjectList.map(dom => new LiteDomNode(dom).getNodes())
  }
  getNodes(): NodeType[] {
    return this._nodes;
  }
}