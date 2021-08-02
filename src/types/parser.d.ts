import DomObjectType from './lite_dom'
interface EmmetParserType {
  parse(emmet: string): DomObjectType | void
}
export default EmmetParserType