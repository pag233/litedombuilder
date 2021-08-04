import { DomObjectBuilder } from '../dom-object-builder'
interface ParserType {
  parse(emmet: string): DomObjectBuilder[]
}
export default ParserType