import ParserType from './types/parser.type'
import { LiteDomNode } from './lite-dom-node';
import { NodeType } from './types/lite-dom.type';

type AttrQueryObjectCurrentBuildType = {
  [index: string]: string
}

type AttrQueryObjectType = {
  [index: string]: AttrQueryObjectCurrentBuildType
}

function isAttrQueryCurrentBuild(queryObject: AttrQueryObjectType | AttrQueryObjectCurrentBuildType): queryObject is AttrQueryObjectCurrentBuildType {
  let isCurBuild = true;
  for (const key in queryObject) {
    if (typeof queryObject[key] === 'object') {
      isCurBuild = false;
    }
  }
  return isCurBuild;
}

export default class LiteDomBuilder {
  _parser: ParserType
  _nodes: NodeType[] = []
  constructor(parser: ParserType) {
    this._parser = parser
  }
  build(emmet: string): LiteDomBuilder {
    this._nodes = this._parser.parse(emmet).map(builder => new LiteDomNode(builder.getDomObject()).getNodes());
    return this;
  }
  /**
   * 将当前构建节点添加至选择器匹配的节点
   * @param selector 选择器
   * @param nodes HTMLElement或TEXT节点数组
   * @param emmet emmet表达式
   */
  append(selector: string): LiteDomBuilder
  append(selector: string, nodes: NodeType[]): LiteDomBuilder;
  append(selector: string, emmet: string): LiteDomBuilder;
  append(selector: string, childElements?: string | NodeType[]): LiteDomBuilder {
    const matchedElements = document.querySelectorAll(selector);
    for (const elem of Array.from(matchedElements)) {
      if (childElements == undefined) {
        elem.append(...this._nodes);
      }
      else if (typeof childElements === 'string') {
        this.build(childElements);
        elem.append(...this._nodes);
      } else {
        elem.append(...Array.from(childElements));
      }
    }
    return this;
  }

  prepend(selector: string): LiteDomBuilder;
  prepend(selector: string, nodes: NodeType[]): LiteDomBuilder;
  prepend(selector: string, emmet: string): LiteDomBuilder;
  prepend(selector: string, childElements?: string | NodeType[]): LiteDomBuilder {
    const matchedElements = document.querySelectorAll(selector);
    for (const elem of Array.from(matchedElements)) {
      if (childElements == undefined) {
        elem.prepend(...this._nodes);
      }
      else if (typeof childElements === 'string') {
        this.build(childElements);
        elem.prepend(...this._nodes);
      } else {
        elem.prepend(...Array.from(childElements));
      }
    }
    return this;
  }
  remove(selector: string): LiteDomBuilder {
    const matchedElements = document.querySelectorAll(selector);
    for (const elem of Array.from(matchedElements)) {
      elem.remove();
    }
    return this;
  }
  /**
   * 为所有的当前构造节点或通过参数选择的节点添加监听器
   * @param type - 格式：[selector@]type 如：".foo@click"为类为foo的click事件添加监听器，"update"为当前构造中的节点添加监听器。
   * @param listener - 事件监听器
   */
  on(queryOrType: string, listener: EventListener | EventListenerObject): LiteDomBuilder {
    if (queryOrType.includes('@')) {
      const [selector, type] = queryOrType.split('@')
      const matchedElements = document.querySelectorAll(selector);
      for (const elem of Array.from(matchedElements)) {
        elem.addEventListener(type, listener)
      }
    } else {
      for (const elem of Array.from(this._nodes)) {
        if (!(elem instanceof Text)) {
          elem.addEventListener(queryOrType, listener)
        }
      }
    }
    return this;
  }
  /**
 * 为所有的当前构造节点或通过参数选择的节点移除监听器
 * @param type - 格式：[selector@]type 如：".foo@click"为类为foo的click事件移除监听器，"update"为当前构造中的节点移除监听器。
 */
  off(queryOrType: string, listener: EventListener | EventListenerObject): LiteDomBuilder {
    if (queryOrType.includes('@')) {
      const [selector, type] = queryOrType.split('@')
      const matchedElements = document.querySelectorAll(selector);
      for (const elem of Array.from(matchedElements)) {
        elem.removeEventListener(type, listener)
      }
    } else {
      for (const elem of Array.from(this._nodes)) {
        if (!(elem instanceof Text)) {
          elem.removeEventListener(queryOrType, listener)
        }
      }
    }
    return this;
  }
  /**
   * 直接属性对象如：{id:'foo'}则会应用至当前构建对象，若传入以选择器为键以属性对象为值的对象则修改所有匹配相应选择器对象的属性
   * @param queryOrBuildObject - 属性对象
   */
  attrs(queryOrBuildObject: AttrQueryObjectType | AttrQueryObjectCurrentBuildType): LiteDomBuilder {
    if (isAttrQueryCurrentBuild(queryOrBuildObject)) {
      for (const key in queryOrBuildObject) {
        for (const elem of this._nodes) {
          if (!(elem instanceof Text)) {
            elem.setAttribute(key, queryOrBuildObject[key])
          }
        }
      }
    } else {
      for (const query in queryOrBuildObject) {
        const matchedElements = document.querySelectorAll(query);
        for (const elem of Array.from(matchedElements)) {
          for (const name in queryOrBuildObject[query]) {
            elem.setAttribute(name, queryOrBuildObject[query][name]);
          }
        }
      }
    }
    return this
  }

  text(text: string): LiteDomBuilder;
  text(selector: string, text?: string): LiteDomBuilder
  text(selectorOrText: string, text?: string): LiteDomBuilder {
    if (text) {
      const textNode = document.createTextNode(text);
      const matchedElements = document.querySelectorAll(selectorOrText);
      for (const elem of Array.from(matchedElements)) {
        elem.append(textNode);
      }
    } else {
      const textNode = document.createTextNode(selectorOrText);
      for (const elem of this._nodes) {
        if (!(elem instanceof Text)) {
          elem.append(textNode)
        }
      }
    }
    return this;
  }

  clear(): LiteDomBuilder {
    this._nodes = [];
    return this;
  }
}