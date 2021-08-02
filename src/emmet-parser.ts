import { DomObjectType } from './types/lite_dom';
import EmmetParserType from './types/parser'

/**
 * 将emmet表达式转化为 LiteDOMType对象
 */
export default class EmmetParser implements EmmetParserType {
  parse(emmet: string) {
    const openParenthesisIdx: number[] = [];
    const innerEmmetStr: Array<[string, number]> = [];
    let i = 0;
    for (let charIdx = 0; charIdx < emmet.length; charIdx++) {
      if (emmet[charIdx] === '(') {
        openParenthesisIdx.push(charIdx);
      }
      else if (emmet[charIdx] === ')') {
        if (openParenthesisIdx.length < 1) throw new Error('Wrong Emmet abbreviations format: ' + emmet);
        let times = 1;
        if (emmet[charIdx + 1] === '*' && !Number.isNaN(parseInt(emmet[charIdx + 2]))) {
          times = Number(emmet[charIdx + 2]);
        }
        const copenParenthesisIndex = openParenthesisIdx.pop() as number;
        if (openParenthesisIdx.length === 0) {
          innerEmmetStr.push([emmet.substring(copenParenthesisIndex + 1, charIdx), times]);
        }
      }
    }
    if (innerEmmetStr.length > 0) {
      // console.log(innerEmmetStr);
      for (const e of innerEmmetStr) {
        this.parse(e[0]);
      }
    } else {
    }
  }
}