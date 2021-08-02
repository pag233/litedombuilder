import { LiteralOrArray } from './types/common.type'

/**
 * 返字符串数组或数字数组拼接成以分隔符分割的字符串
 * @param liteOrArr - 字符串、数字数组
 * @param  sep  - 分隔符
 * @returns 拼接后的字符串
 */
function joinString(liteOrArr: LiteralOrArray, sep = " "): string {
  if (typeof liteOrArr === 'string' || typeof liteOrArr === 'number') return String(liteOrArr);
  return liteOrArr.join(sep);
}

export {
  joinString
}