import { DomObjectType, ChildrenType } from './types/lite-dom.type';
import TagName from './types/tag.type';
import { PropType } from './types/props.type';
import { cloneDeep } from 'lodash'

export class DomObjectBuilder {
  _tag: TagName
  _props?: PropType;
  _children?: ChildrenType;
  constructor(domObject: { tag: TagName, props?: PropType, children?: ChildrenType }) {
    this._tag = domObject.tag;
    this._props = domObject.props;
    this._children = domObject.children;
  }
  times(times: number): DomObjectType[] {
    return Array(times).fill(cloneDeep(this.getDomObject()));
  }
  join(domObjectBuilder: DomObjectBuilder | DomObjectBuilder[]): DomObjectType[] {
    if (Array.isArray(domObjectBuilder)) {
      return [this.getDomObject(), ...domObjectBuilder.map(builder => builder.getDomObject())];
    }
    return [this.getDomObject(), domObjectBuilder.getDomObject()];
  }
  append(domObjectBuilder: DomObjectBuilder | DomObjectBuilder[] | string): DomObjectBuilder {
    const children = this._children ? this._children : [];
    if (Array.isArray(domObjectBuilder)) {
      this._children = [...children, ...domObjectBuilder.map(builder => builder.getDomObject())];
    }
    else if (typeof domObjectBuilder === 'string') {
      this._children = [...children, domObjectBuilder];
    }
    else {
      this._children = [...children, domObjectBuilder.getDomObject()];
    }
    return this;
  }
  setProps(props: PropType) {
    this._props = props;
  }
  getDomObject(): DomObjectType {
    const obj = Object.create(null);
    obj.tag = this._tag;
    if (this._children) {
      obj.children = this._children;
    }
    if (this._props) {
      obj.props = this._props;
    }
    return obj
  }
}