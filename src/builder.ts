import EmmetParserType from './types/parser'

class LiteDomBuilder {
  _parser: EmmetParserType
  constructor(parser: EmmetParserType) {
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