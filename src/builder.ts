import ParserType from './types/parser.type'

class LiteDomBuilder {
  _parser: ParserType
  constructor(parser: ParserType) {
    this._parser = parser
  }
  create(emmet: string) {
    const domObject = this._parser.parse(emmet)
  }
  append(emmet: string) {

  }
  prepend(emmet: string) {

  }
  remove(query: string) {

  }
}