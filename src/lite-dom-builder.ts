import ParserType from './types/parser.type'
import { LiteDomNode } from './lite-dom-node';
import { NodeType } from './types/lite-dom.type';

declare const e: HTMLElement;

export default class LiteDomBuilder {
  _parser: ParserType
  constructor(parser: ParserType) {
    this._parser = parser
  }
  create(emmet: string): NodeType[] {
    const nodeArray = this._parser.parse(emmet).map(builder => new LiteDomNode(builder.getDomObject()).getNodes());
    return nodeArray
  }

  append(query: string, nodes: NodeType[]): LiteDomBuilder;
  append(query: string, emmet: string): LiteDomBuilder;
  append(query: string, childElements: string | NodeType[]): LiteDomBuilder {
    const matchedElements = document.querySelectorAll(query);
    for (const elem of Array.from(matchedElements)) {
      if (typeof childElements === 'string') {
        elem.append(...this.create(childElements));
      } else {
        elem.append(...Array.from(childElements));
      }
    }
    return this;
  }

  prepend(query: string, nodes: NodeType[]): LiteDomBuilder;
  prepend(query: string, emmet: string): LiteDomBuilder;
  prepend(query: string, childElements: string | NodeType[]): LiteDomBuilder {
    const matchedElements = document.querySelectorAll(query);
    for (const elem of Array.from(matchedElements)) {
      if (typeof childElements === 'string') {
        elem.prepend(...this.create(childElements));
      } else {
        elem.prepend(...Array.from(childElements));
      }
    }
    return this;
  }

  remove(query: string): LiteDomBuilder {
    const matchedElements = document.querySelectorAll(query);
    for (const elem of Array.from(matchedElements)) {
      elem.remove();
    }
    return this;
  }
}