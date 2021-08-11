# litedombuilder

构建/操作 dom 轻量级封装，支持 emmet 语法。

## 主要运行/开发/测试依赖

- lodash
- @types/lodash

- webpack
- typescript
- ts-loader

- jest
- jquery

## 兼容

- IE11
- es6+

## Example Usage

```
import LiteDOMBuilder from 'lite-dom-builder'
import EmmetParser from 'emmet-parser';
const builder = new LiteDOMBuilder(EmmetParser.getParser());
builder.build("div.foo[style="color:inhert;"]*3").append("#container");

const nodes = document.querySelector(".foo");
expect(nodes.length).toEqual(3);
expect(nodes[0].className).toEqual("foo");
expect(node[0].style.color).toEqual("black");
```

## API

### LiteDOMBuilder

#### build

构建当前节点

```
  build(emmet: string): LiteDomBuilder
```

### append

添加节点

```
  /**
   * 将当前构建节点添加至选择器匹配的节点
   * @param selector 选择器
   * @param nodes HTMLElement或TEXT节点数组
   * @param emmet emmet表达式
   */
  append(selector: string): LiteDomBuilder
  append(selector: string, nodes: NodeType[]): LiteDomBuilder;
  append(selector: string, emmet: string): LiteDomBuilder;
```

### prepend

同 append

```
  prepend(selector: string): LiteDomBuilder;
  prepend(selector: string, nodes: NodeType[]): LiteDomBuilder;
  prepend(selector: string, emmet: string): LiteDomBuilder;
```

### remove

删除节点

```
  remove(selector: string): LiteDomBuilder

```

### on

```
  /**
   * 为所有的当前构造节点或通过参数选择的节点添加监听器
   * @param type - 格式：[selector@]type 如：".foo@click"为类为foo的click事件添加监听器，"update"为当前构造中的节点添加监听器。
   * @param listener - 事件监听器
   */
  on(queryOrType: string, listener: EventListener | EventListenerObject): LiteDomBuilder
```

### off

```
  /**
 * 为所有的当前构造节点或通过参数选择的节点移除监听器
 * @param type - 格式：[selector@]type 如：".foo@click"为类为foo的click事件移除监听器，"update"为当前构造中的节点移除监听器。
 */
  off(queryOrType: string, listener: EventListener | EventListenerObject): LiteDomBuilder
```

### attrs

修改属性

```
  /**
   * 直接属性对象如：{id:'foo'}则会应用至当前构建对象，若传入以选择器为键以属性对象为值的对象则修改所有匹配相应选择器对象的属性
   * @param queryOrBuildObject - 属性对象
   */
  attrs(queryOrBuildObject: AttrQueryObjectType | AttrQueryObjectCurrentBuildType): LiteDomBuilder
```

### text

添加文字

```
  text(text: string): LiteDomBuilder;
  text(selector: string, text?: string): LiteDomBuilder
  text(selectorOrText: string, text?: string): LiteDomBuilder {
```

### clear

清除当前构建节点

```
  clear(): LiteDomBuilder
```
