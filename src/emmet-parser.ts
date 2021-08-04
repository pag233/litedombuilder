import ParserType from './types/parser.type'
import { DomObjectBuilder } from './dom-object-builder'
import TagName from './types/tag.type';
import { PropType } from './types/props.type';
import { expandArray } from './helper';

const LineOrWordRegex = /^(\((?<line>.+)\)|(?<word>[^*]+))(\*(?<times>\d+))?/

/**
 * 将emmet表达式转化为 DomObjectBuilder[]对象。
 * 名词解释：
 *   Line：一个Line以>或+分割成若干个Unit组成，当组成该Line的Unit的个数大于1时该Unit为该Line一个子Line，否则该Unit为一个Word。
 *   Unit：组成一个Line的组成部分，其本身可以为一个Line或一个Word。
 *   Word：转义为DomObjectBuilder的最小单位。
 */
export default class EmmetParser implements ParserType {
  /**
   * 
   * @param emmet - emmet 字符串
   */
  parse(emmet: string): DomObjectBuilder[] {
    return this._parseLine(emmet);
  }
  _parseLine(emmet: string): DomObjectBuilder[] {
    let charIdx = 0;
    let cutIdx = 0;
    const units: string[] = [];
    let openParenthesisCounter: number = 0;
    //分割Line为若干Unit。
    while (charIdx < emmet.length) {
      if (emmet[charIdx] === '(') {
        openParenthesisCounter++;
      } else if (emmet[charIdx] === ')') {
        openParenthesisCounter--;
      }
      else if (emmet[charIdx].match(/[>+]/) && openParenthesisCounter === 0) {
        units.push(emmet.slice(cutIdx, charIdx).trim());
        units.push(emmet[charIdx]);
        cutIdx = charIdx + 1;
      }
      charIdx++;
    }
    units.push(emmet.slice(cutIdx, charIdx).trim());
    // console.log(units);

    if (units.length % 2 === 0) throw Error('Failed to parse emmet: ' + emmet);

    //存放结果的数组
    let accBuilderArray: DomObjectBuilder[] = [];

    //若Line中只包括一个单元即没有被>或+分割则Unit之间不去进行>或+运算
    if (units.length === 1) {
      accBuilderArray = [...this._parseUnit(units.pop() as string)]
    } else {
      //进行>或+运算
      let index = units.length - 2;
      while (index > 0) {
        const operator = units[index];
        const operandLeft = units[index - 1];
        const operandRight = units[index + 1];
        const unitLeft = this._parseUnit(operandLeft);
        if (accBuilderArray.length === 0) {
          accBuilderArray = this._parseUnit(operandRight);
        }
        if (operator === '+') {
          accBuilderArray = [...unitLeft, ...accBuilderArray];
        } else if (operator === '>') {
          accBuilderArray = unitLeft.map(builder => builder.append(accBuilderArray))
        }
        index -= 2;
      }
    }

    return accBuilderArray;
  }
  _parseUnit(emmet: string): DomObjectBuilder[] {
    /**
     * 不带括号 - 直接转义
     * 带括号不带乘数 - 将转义结果乘以默认乘数
     * 带括号带乘数 - 将转义结果乘以乘数
     */
    const results = LineOrWordRegex.exec(emmet);
    const line = results?.groups?.line;
    const word = results?.groups?.word;
    const times = results?.groups?.times ? parseInt(results?.groups?.times) : 1;
    if (line) {
      return expandArray(this._parseLine(line), times);
      // return this.parseLine(line);
    } else if (word) {
      return this._parseWord(word, times);
      // return this.parseWord(word);
    } else {
      throw Error('Failed to parse word:' + emmet);
    }
  }
  /**
   * 
   * @param emmet - emmet字符串
   * @param times - 扩展倍数
   */
  _parseWord(emmet: string, times: number): DomObjectBuilder[] {
    const accBuilderArray: DomObjectBuilder[] = [];
    let index = 0;
    let indexedEmmet;
    while (index < times) {
      //替换$符号为index+1
      indexedEmmet = emmet.replace(/\$/g, String(index + 1));
      const tagReg = /^(?<tag>(\w|\d|-)+)(\.(?<class>\w+))*(#(?<id>\w+))*(\[(?<props>(\w|\d|=|\s|"|')+)\])*({(?<content>.+)})*/
      const results = indexedEmmet.match(tagReg);
      if (!results) throw new Error("Failed to parse emmet unit: " + emmet);
      const tag = results.groups?.tag as TagName;
      const classType = results.groups?.class;
      const id = results.groups?.id;
      const props = results.groups?.props;
      const content = results.groups?.content;
      let propsArray: string[] = [];
      const propsObj: PropType = Object.create(null);
      const domObjBuilder = new DomObjectBuilder({ tag });
      if (classType) {
        propsObj.classType = classType;
      }
      if (id) {
        propsObj.id = id;
      }
      if (props != undefined) {
        propsArray = props.split(' ');
        for (const prop of propsArray) {
          if (prop.indexOf('=') > -1) {
            const [name, value] = prop.split('=');
            propsObj[name] = value.replace(/["']/g, "");
          } else {
            propsObj[prop] = true;
          }
        }
      }
      if (Object.keys(propsObj).length > 0) {
        domObjBuilder.setProps(propsObj);
      }
      if (content != undefined) {
        domObjBuilder.append(content);
      }
      accBuilderArray.push(domObjBuilder);
      index++;
    }
    return accBuilderArray;
  }
}