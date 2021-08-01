import TagName from './tag'
import PropType from './props'

type ChildrenType = Array<DomObjectType | string>

type NodeType = HTMLElement | Text

interface DomObjectType {
  tag: TagName
  props?: PropType
  children?: ChildrenType
}
interface LiteDomType {
  getNodes(): NodeType | NodeType[]
}
export { DomObjectType, ChildrenType, LiteDomType, NodeType }