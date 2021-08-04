import { LiteralOrArray } from './types/common.type'
import { cloneDeep } from 'lodash'

/**
 * 返字符串数组或数字数组拼接成以分隔符分割的字符串
 * @param liteOrArr - 字符串、数字数组
 * @param  sep  - 分隔符
 * @returns 拼接后的字符串
 */
function joinString(liteOrArr: LiteralOrArray | boolean, sep = " "): string {
  if (typeof liteOrArr === 'string' || typeof liteOrArr === 'number' || typeof liteOrArr === 'boolean') return String(liteOrArr);
  return liteOrArr.join(sep);
}

function expandArray<T>(array: T[], times: number): T[] {
  let acc: T[] = [];
  while (times > 0) {
    acc = [...acc, ...array.map(cloneDeep)];
    times--;
  }
  return acc;
}

export {
  joinString,
  expandArray
}