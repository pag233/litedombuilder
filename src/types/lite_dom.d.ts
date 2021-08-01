import TagName from './tag'
import PropType from './props'

type ChildrenType = Array<LiteDOMType | TagName>

interface LiteDOMType {
  tag: TagName
  props?: PropType
  children?: ChildrenType
}

export default LiteDOMType
export { ChildrenType }