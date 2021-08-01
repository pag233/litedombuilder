import { LiteralOrArray } from './common'

interface PropType {
  id?: number | string
  classType?: LiteralOrArray
  [prop: string]: LiteralOrArray
}

export default PropType