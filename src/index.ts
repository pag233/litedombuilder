/**
 * @version 0.0.1
 * @author byhbpag3
 * @date 2021-8-1
 * @description 操作dom轻量级封装，支持emmet语法。
 */
// export { default as LiteDomBuilder } from './lite-dom-builder'
import './index.scss'

import LiteDomBuilder from './lite-dom-builder'
import EmmetParser from './emmet-parser'


const builder = new LiteDomBuilder(EmmetParser.getParser());

builder.append('#root', 'div.foo+div.bar');

builder.on('.foo@click', () => {
  console.log('fired');
})