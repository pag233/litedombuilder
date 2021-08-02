import { LiteralOrArray } from './common.type'

interface PropType {
  id?: number | string
  classType?: LiteralOrArray
  [prop: string]: LiteralOrArray | undefined
}

export { PropType }