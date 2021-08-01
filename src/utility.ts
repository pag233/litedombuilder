import { LiteralOrArray } from './types/common'

function joinString(strList: LiteralOrArray, sep = " "): string {
  if (typeof strList === 'string' || typeof strList === 'number') return String(strList);
  return strList.join(sep);
}

export {
  joinString
}