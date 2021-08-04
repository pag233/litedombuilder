import { LiteralOrArray } from './common.type'

interface PropType {
  id?: string
  classType?: LiteralOrArray
  [prop: string]: LiteralOrArray | boolean | undefined
}

export { PropType }