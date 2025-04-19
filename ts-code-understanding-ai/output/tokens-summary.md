
          # 文件总结: /Users/qinzhenxin/Documents/own/Daily/ts-code-understanding-ai/src/slate/packages/slate-hyperscript/src/tokens.ts

          ## 源代码
          ```js
          import { Node, Path, Text } from 'slate'

/**
 * A weak map to hold anchor tokens.
 */

const ANCHOR: WeakMap<Node, [number, AnchorToken]> = new WeakMap()

/**
 * A weak map to hold focus tokens.
 */

const FOCUS: WeakMap<Node, [number, FocusToken]> = new WeakMap()

/**
 * All tokens inherit from a single constructor for `instanceof` checking.
 */

export class Token {}

/**
 * Anchor tokens represent the selection's anchor point.
 */

export class AnchorToken extends Token {
  offset?: number
  path?: Path

  constructor(
    props: {
      offset?: number
      path?: Path
    } = {}
  ) {
    super()
    const { offset, path } = props
    this.offset = offset
    this.path = path
  }
}

/**
 * Focus tokens represent the selection's focus point.
 */

export class FocusToken extends Token {
  offset?: number
  path?: Path

  constructor(
    props: {
      offset?: number
      path?: Path
    } = {}
  ) {
    super()
    const { offset, path } = props
    this.offset = offset
    this.path = path
  }
}

/**
 * Add an anchor token to the end of a text node.
 */

export const addAnchorToken = (text: Text, token: AnchorToken) => {
  const offset = text.text.length
  ANCHOR.set(text, [offset, token])
}

/**
 * Get the offset if a text node has an associated anchor token.
 */

export const getAnchorOffset = (
  text: Text
): [number, AnchorToken] | undefined => {
  return ANCHOR.get(text)
}

/**
 * Add a focus token to the end of a text node.
 */

export const addFocusToken = (text: Text, token: FocusToken) => {
  const offset = text.text.length
  FOCUS.set(text, [offset, token])
}

/**
 * Get the offset if a text node has an associated focus token.
 */

export const getFocusOffset = (
  text: Text
): [number, FocusToken] | undefined => {
  return FOCUS.get(text)
}

          ```

          ## 代码摘要
          ```js
          - (variable) ANCHOR
  行号: 7-7
  注释: A weak map to hold anchor tokens.

- (variable) FOCUS
  行号: 13-13
  注释: A weak map to hold focus tokens.

- (variable) addAnchorToken
  行号: 67-70
  注释: Add an anchor token to the end of a text node.

- (variable) getAnchorOffset
  行号: 76-80
  注释: Get the offset if a text node has an associated anchor token.

- (variable) addFocusToken
  行号: 86-89
  注释: Add a focus token to the end of a text node.

- (variable) getFocusOffset
  行号: 95-99
  注释: Get the offset if a text node has an associated focus token.

- (class) Token
  行号: 19-19
  注释: All tokens inherit from a single constructor for `instanceof` checking.

- (class) AnchorToken
  行号: 25-40
  注释: Anchor tokens represent the selection's anchor point.

- (classProperty) offset [class: AnchorToken]
  行号: 26-26
  注释: 

- (classProperty) path [class: AnchorToken]
  行号: 27-27
  注释: 

- (class) FocusToken
  行号: 46-61
  注释: Focus tokens represent the selection's focus point.

- (classProperty) offset [class: FocusToken]
  行号: 47-47
  注释: 

- (classProperty) path [class: FocusToken]
  行号: 48-48
  注释: 
          ```

          ## 模型返回的总结
          ```txt
           # 文件分析: tokens.ts - 管理文本节点锚点和焦点标记

## 1. 文件概览
- **路径**: /Users/qinzhenxin/Documents/own/Daily/ts-code-understanding-ai/src/slate/packages/slate-hyperscript/src/tokens.ts
- **核心功能**: 管理文本节点锚点和焦点标记，提供添加和获取相关偏移量的功能。
- **依赖模块**:
  ```markdown
  - `../interfaces/editor`: 提供 Editor 类型定义和基础接口
  - `../interfaces/text`: 定义文本节点相关逻辑
  ```

## 2. 代码解析
### Token
#### 功能说明
Token类是所有标记的基类，提供了`instanceof`检查的基础。

#### 参数详解
无参数。

#### 关键逻辑
1. `ANCHOR`和`FOCUS`变量分别用于存储锚点和焦点标记的弱映射表。
2. `addAnchorToken`函数用于在文本节点末尾添加一个锚点标记。
3. `getAnchorOffset`函数用于获取文本节点的锚点偏移量。
4. `addFocusToken`函数用于在文本节点末尾添加一个焦点标记。
5. `getFocusOffset`函数用于获取文本节点的焦点偏移量。

## 3. 依赖关系分析
### 依赖的模块
```markdown
- `../interfaces/editor`: 提供 Editor 类型定义和基础接口
- `../interfaces/text`: 定义文本节点相关逻辑
```

### 被其他模块引用
```markdown
- `../commands/insert.ts`: 在插入内容时调用此模块的查询功能
```

## 4. 使用示例
```typescript
// 添加锚点标记
addAnchorToken(textNode, offset);

// 获取锚点偏移量
const anchorOffset = getAnchorOffset(textNode);

// 添加焦点标记
addFocusToken(textNode, offset);

// 获取焦点偏移量
const focusOffset = getFocusOffset(textNode);
```

## 5. 常见问题
1. **如何判断文本节点是否包含锚点或焦点标记？**
   - 可以使用`getAnchorOffset`和`getFocusOffset`方法来检查文本节点是否有对应的标记。
2. **锚点和焦点标记有什么区别？**
   - 锚点标记表示选择器的起点，而焦点标记表示选择器的终点。

## 6. 在浏览器兼容性方面做的处理
无特殊处理，默认支持现代浏览器的标准功能。
          ```
        