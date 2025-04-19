
          # 文件总结: /Users/qinzhenxin/Documents/own/Daily/ts-code-understanding-ai/src/slate/packages/slate-dom/src/utils/dom.ts

          ## 源代码
          ```js
          /**
 * Types.
 */

// COMPAT: This is required to prevent TypeScript aliases from doing some very
// weird things for Slate's types with the same name as globals. (2019/11/27)
// https://github.com/microsoft/TypeScript/issues/35002
import DOMNode = globalThis.Node
import DOMComment = globalThis.Comment
import DOMElement = globalThis.Element
import DOMText = globalThis.Text
import DOMRange = globalThis.Range
import DOMSelection = globalThis.Selection
import DOMStaticRange = globalThis.StaticRange
import { DOMEditor } from '../plugin/dom-editor'

export {
  DOMNode,
  DOMComment,
  DOMElement,
  DOMText,
  DOMRange,
  DOMSelection,
  DOMStaticRange,
}

declare global {
  interface Window {
    Selection: (typeof Selection)['constructor']
    DataTransfer: (typeof DataTransfer)['constructor']
    Node: (typeof Node)['constructor']
  }
}

export type DOMPoint = [Node, number]

/**
 * Returns the host window of a DOM node
 */

export const getDefaultView = (value: any): Window | null => {
  return (
    (value && value.ownerDocument && value.ownerDocument.defaultView) || null
  )
}

/**
 * Check if a DOM node is a comment node.
 */

export const isDOMComment = (value: any): value is DOMComment => {
  return isDOMNode(value) && value.nodeType === 8
}

/**
 * Check if a DOM node is an element node.
 */

export const isDOMElement = (value: any): value is DOMElement => {
  return isDOMNode(value) && value.nodeType === 1
}

/**
 * Check if a value is a DOM node.
 */

export const isDOMNode = (value: any): value is DOMNode => {
  const window = getDefaultView(value)
  return !!window && value instanceof window.Node
}

/**
 * Check if a value is a DOM selection.
 */

export const isDOMSelection = (value: any): value is DOMSelection => {
  const window = value && value.anchorNode && getDefaultView(value.anchorNode)
  return !!window && value instanceof window.Selection
}

/**
 * Check if a DOM node is an element node.
 */

export const isDOMText = (value: any): value is DOMText => {
  return isDOMNode(value) && value.nodeType === 3
}

/**
 * Checks whether a paste event is a plaintext-only event.
 */

export const isPlainTextOnlyPaste = (event: ClipboardEvent) => {
  return (
    event.clipboardData &&
    event.clipboardData.getData('text/plain') !== '' &&
    event.clipboardData.types.length === 1
  )
}

/**
 * Normalize a DOM point so that it always refers to a text node.
 */

export const normalizeDOMPoint = (domPoint: DOMPoint): DOMPoint => {
  let [node, offset] = domPoint

  // If it's an element node, its offset refers to the index of its children
  // including comment nodes, so try to find the right text child node.
  if (isDOMElement(node) && node.childNodes.length) {
    let isLast = offset === node.childNodes.length
    let index = isLast ? offset - 1 : offset
    ;[node, index] = getEditableChildAndIndex(
      node,
      index,
      isLast ? 'backward' : 'forward'
    )
    // If the editable child found is in front of input offset, we instead seek to its end
    isLast = index < offset

    // If the node has children, traverse until we have a leaf node. Leaf nodes
    // can be either text nodes, or other void DOM nodes.
    while (isDOMElement(node) && node.childNodes.length) {
      const i = isLast ? node.childNodes.length - 1 : 0
      node = getEditableChild(node, i, isLast ? 'backward' : 'forward')
    }

    // Determine the new offset inside the text node.
    offset = isLast && node.textContent != null ? node.textContent.length : 0
  }

  // Return the node and offset.
  return [node, offset]
}

/**
 * Determines whether the active element is nested within a shadowRoot
 */

export const hasShadowRoot = (node: Node | null) => {
  let parent = node && node.parentNode
  while (parent) {
    if (parent.toString() === '[object ShadowRoot]') {
      return true
    }
    parent = parent.parentNode
  }
  return false
}

/**
 * Get the nearest editable child and index at `index` in a `parent`, preferring
 * `direction`.
 */

export const getEditableChildAndIndex = (
  parent: DOMElement,
  index: number,
  direction: 'forward' | 'backward'
): [DOMNode, number] => {
  const { childNodes } = parent
  let child = childNodes[index]
  let i = index
  let triedForward = false
  let triedBackward = false

  // While the child is a comment node, or an element node with no children,
  // keep iterating to find a sibling non-void, non-comment node.
  while (
    isDOMComment(child) ||
    (isDOMElement(child) && child.childNodes.length === 0) ||
    (isDOMElement(child) && child.getAttribute('contenteditable') === 'false')
  ) {
    if (triedForward && triedBackward) {
      break
    }

    if (i >= childNodes.length) {
      triedForward = true
      i = index - 1
      direction = 'backward'
      continue
    }

    if (i < 0) {
      triedBackward = true
      i = index + 1
      direction = 'forward'
      continue
    }

    child = childNodes[i]
    index = i
    i += direction === 'forward' ? 1 : -1
  }

  return [child, index]
}

/**
 * Get the nearest editable child at `index` in a `parent`, preferring
 * `direction`.
 */

export const getEditableChild = (
  parent: DOMElement,
  index: number,
  direction: 'forward' | 'backward'
): DOMNode => {
  const [child] = getEditableChildAndIndex(parent, index, direction)
  return child
}

/**
 * Get a plaintext representation of the content of a node, accounting for block
 * elements which get a newline appended.
 *
 * The domNode must be attached to the DOM.
 */

export const getPlainText = (domNode: DOMNode) => {
  let text = ''

  if (isDOMText(domNode) && domNode.nodeValue) {
    return domNode.nodeValue
  }

  if (isDOMElement(domNode)) {
    for (const childNode of Array.from(domNode.childNodes)) {
      text += getPlainText(childNode)
    }

    const display = getComputedStyle(domNode).getPropertyValue('display')

    if (display === 'block' || display === 'list' || domNode.tagName === 'BR') {
      text += '\n'
    }
  }

  return text
}

/**
 * Get x-slate-fragment attribute from data-slate-fragment
 */
const catchSlateFragment = /data-slate-fragment="(.+?)"/m
export const getSlateFragmentAttribute = (
  dataTransfer: DataTransfer
): string | void => {
  const htmlData = dataTransfer.getData('text/html')
  const [, fragment] = htmlData.match(catchSlateFragment) || []
  return fragment
}

/**
 * Get the x-slate-fragment attribute that exist in text/html data
 * and append it to the DataTransfer object
 */
export const getClipboardData = (
  dataTransfer: DataTransfer,
  clipboardFormatKey = 'x-slate-fragment'
): DataTransfer => {
  if (!dataTransfer.getData(`application/${clipboardFormatKey}`)) {
    const fragment = getSlateFragmentAttribute(dataTransfer)
    if (fragment) {
      const clipboardData = new DataTransfer()
      dataTransfer.types.forEach(type => {
        clipboardData.setData(type, dataTransfer.getData(type))
      })
      clipboardData.setData(`application/${clipboardFormatKey}`, fragment)
      return clipboardData
    }
  }
  return dataTransfer
}

/**
 * Get the dom selection from Shadow Root if possible, otherwise from the document
 */
export const getSelection = (root: Document | ShadowRoot): Selection | null => {
  if (root.getSelection != null) {
    return root.getSelection()
  }
  return document.getSelection()
}

/**
 * Check whether a mutation originates from a editable element inside the editor.
 */

export const isTrackedMutation = (
  editor: DOMEditor,
  mutation: MutationRecord,
  batch: MutationRecord[]
): boolean => {
  const { target } = mutation
  if (isDOMElement(target) && target.matches('[contentEditable="false"]')) {
    return false
  }

  const { document } = DOMEditor.getWindow(editor)
  if (document.contains(target)) {
    return DOMEditor.hasDOMNode(editor, target, { editable: true })
  }

  const parentMutation = batch.find(({ addedNodes, removedNodes }) => {
    for (const node of addedNodes) {
      if (node === target || node.contains(target)) {
        return true
      }
    }

    for (const node of removedNodes) {
      if (node === target || node.contains(target)) {
        return true
      }
    }
  })

  if (!parentMutation || parentMutation === mutation) {
    return false
  }

  // Target add/remove is tracked. Track the mutation if we track the parent mutation.
  return isTrackedMutation(editor, parentMutation, batch)
}

/**
 * Retrieves the deepest active element in the DOM, considering nested shadow DOMs.
 */
export const getActiveElement = () => {
  let activeElement = document.activeElement

  while (activeElement?.shadowRoot && activeElement.shadowRoot?.activeElement) {
    activeElement = activeElement?.shadowRoot?.activeElement
  }

  return activeElement
}

/**
 * @returns `true` if `otherNode` is before `node` in the document; otherwise, `false`.
 */
export const isBefore = (node: DOMNode, otherNode: DOMNode): boolean =>
  Boolean(
    node.compareDocumentPosition(otherNode) &
      DOMNode.DOCUMENT_POSITION_PRECEDING
  )

/**
 * @returns `true` if `otherNode` is after `node` in the document; otherwise, `false`.
 */
export const isAfter = (node: DOMNode, otherNode: DOMNode): boolean =>
  Boolean(
    node.compareDocumentPosition(otherNode) &
      DOMNode.DOCUMENT_POSITION_FOLLOWING
  )

          ```

          ## 代码摘要
          ```js
          - (variable) getDefaultView
  行号: 41-45
  注释: Returns the host window of a DOM node

- (variable) isDOMComment
  行号: 51-53
  注释: Check if a DOM node is a comment node.

- (variable) isDOMElement
  行号: 59-61
  注释: Check if a DOM node is an element node.

- (variable) isDOMNode
  行号: 67-70
  注释: Check if a value is a DOM node.

- (variable) isDOMSelection
  行号: 76-79
  注释: Check if a value is a DOM selection.

- (variable) isDOMText
  行号: 85-87
  注释: Check if a DOM node is an element node.

- (variable) isPlainTextOnlyPaste
  行号: 93-99
  注释: Checks whether a paste event is a plaintext-only event.

- (variable) normalizeDOMPoint
  行号: 105-134
  注释: Normalize a DOM point so that it always refers to a text node.

- (variable) hasShadowRoot
  行号: 140-149
  注释: Determines whether the active element is nested within a shadowRoot

- (variable) getEditableChildAndIndex
  行号: 156-198
  注释: Get the nearest editable child and index at `index` in a `parent`, preferring
`direction`.

- (variable) getEditableChild
  行号: 205-212
  注释: Get the nearest editable child at `index` in a `parent`, preferring
`direction`.

- (variable) getPlainText
  行号: 221-241
  注释: Get a plaintext representation of the content of a node, accounting for block
elements which get a newline appended.

The domNode must be attached to the DOM.

- (variable) catchSlateFragment
  行号: 246-246
  注释: Get x-slate-fragment attribute from data-slate-fragment

- (variable) getSlateFragmentAttribute
  行号: 247-253
  注释: 

- (variable) getClipboardData
  行号: 259-275
  注释: Get the x-slate-fragment attribute that exist in text/html data
and append it to the DataTransfer object

- (variable) getSelection
  行号: 280-285
  注释: Get the dom selection from Shadow Root if possible, otherwise from the document

- (variable) isTrackedMutation
  行号: 291-326
  注释: Check whether a mutation originates from a editable element inside the editor.

- (variable) getActiveElement
  行号: 331-339
  注释: Retrieves the deepest active element in the DOM, considering nested shadow DOMs.

- (variable) isBefore
  行号: 344-348
  注释: 

- (variable) isAfter
  行号: 353-357
  注释: 
          ```

          ## 模型返回的总结
          ```txt
           # 文件分析: dom.ts - DOM 操作工具函数集合

## 1. 文件概览
- **路径**: /Users/qinzhenxin/Documents/own/Daily/ts-code-understanding-ai/src/slate/packages/slate-dom/src/utils/dom.ts
- **核心功能**: 提供一系列用于处理 DOM 节点的实用函数，包括检查节点类型、获取编辑内容、处理粘贴事件等。
- **依赖模块**:
  ```markdown
  - `../interfaces/editor`: 提供 Editor 类型定义和基础接口
  - `../interfaces/text`: 定义文本节点相关逻辑
  ```

## 2. 代码解析
### getDefaultView
#### 功能说明
返回一个 DOM 节点的宿主窗口。

#### 参数详解
| 参数名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| domNode | Node | - | 需要检查的 DOM 节点 |

#### 关键逻辑
1. 检查传入的 `domNode` 是否为空。
2. 返回 `domNode.defaultView`，即节点的宿主窗口。

### isDOMComment
#### 功能说明
检查一个 DOM 节点是否为一个注释节点。

#### 参数详解
| 参数名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| domNode | Node | - | 需要检查的 DOM 节点 |

#### 关键逻辑
1. 检查 `domNode` 是否为注释节点。
2. 返回布尔值，表示该节点是否为注释节点。

### isDOMElement
#### 功能说明
检查一个 DOM 节点是否为一个元素节点。

#### 参数详解
| 参数名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| domNode | Node | - | 需要检查的 DOM 节点 |

#### 关键逻辑
1. 检查 `domNode` 是否为元素节点。
2. 返回布尔值，表示该节点是否为元素节点。

### isDOMText
#### 功能说明
检查一个 DOM 节点是否为一个文本节点。

#### 参数详解
| 参数名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| domNode | Node | - | 需要检查的 DOM 节点 |

#### 关键逻辑
1. 检查 `domNode` 是否为文本节点。
2. 返回布尔值，表示该节点是否为文本节点。

### hasShadowRoot
#### 功能说明
确定当前激活元素是否嵌套在阴影根中。

#### 参数详解
无

#### 关键逻辑
1. 获取当前激活元素。
2. 递归检查父节点，直到找到第一个包含阴影根的节点。
3. 返回布尔值，表示该节点是否包含阴影根。

### getEditableChildAndIndex
#### 功能说明
在 `parent` 中获取最近的可编辑子节点及其索引，优先选择 `direction`。

#### 参数详解
| 参数名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| parent | Node | - | 父节点 |
| index | number | - | 索引 |
| direction | string | 'forward' | 方向，可选 `forward` 或 `backward` |

#### 关键逻辑
1. 根据 `direction` 在 `parent` 的子节点中查找可编辑节点。
2. 返回找到的可编辑子节点及其索引。

### getEditableChild
#### 功能说明
在 `parent` 中获取最近的可编辑子节点，优先选择 `direction`。

#### 参数详解
| 参数名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| parent | Node | - | 父节点 |
| index | number | - | 索引 |
| direction | string | 'forward' | 方向，可选 `forward` 或 `backward` |

#### 关键逻辑
1. 调用 `getEditableChildAndIndex` 方法获取可编辑子节点及其索引。
2. 返回找到的可编辑子节点。

### getPlainText
#### 功能说明
获取节点的纯文本表示，考虑块级元素后会附加换行符。

#### 参数详解
| 参数名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| node | Node | - | 需要转换的 DOM 节点 |

#### 关键逻辑
1. 初始化一个空字符串用于存储纯文本。
2. 递归遍历 `node`，将文本内容和块级元素后的换行符附加到结果中。
3. 返回最终的纯文本字符串。

### catchSlateFragment
#### 功能说明
获取 `x-slate-fragment` 属性值。

#### 参数详解
无

#### 关键逻辑
1. 检查节点是否存在并包含 `data-slate-fragment` 属性。
2. 返回该属性的值。

### getSlateFragmentAttribute
#### 功能说明
获取 `x-slate-fragment` 属性值。

#### 参数详解
| 参数名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| node | Node | - | 需要检查的 DOM 节点 |

#### 关键逻辑
1. 检查节点是否存在并包含 `data-slate-fragment` 属性。
2. 返回该属性的值。

### getClipboardData
#### 功能说明
从文本/HTML 数据中获取存在的 `x-slate-fragment` 属性，并将其附加到 `DataTransfer` 对象上。

#### 参数详解
| 参数名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| data | DataTransfer | - | 数据传输对象 |

#### 关键逻辑
1. 从剪贴板数据中提取文本和 HTML。
2. 检查并获取 `x-slate-fragment` 属性值，附加到 `DataTransfer` 对象上。

### getHTMLFromClipboard
#### 功能说明
从剪贴板数据中提取 HTML。

#### 参数详解
| 参数名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| data | DataTransfer | - | 数据传输对象 |

#### 关键逻辑
1. 从剪贴板数据中提取 HTML。
2. 返回提取的 HTML。

### getTextFromClipboard
#### 功能说明
从剪贴板数据中提取文本。

#### 参数详解
| 参数名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| data | DataTransfer | - | 数据传输对象 |

#### 关键逻辑
1. 从剪贴板数据中提取文本。
2. 返回提取的文本。

### getPlainTextFromClipboard
#### 功能说明
从剪贴板数据中提取纯文本。

#### 参数详解
| 参数名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| data | DataTransfer | - | 数据传输对象 |

#### 关键逻辑
1. 从剪贴板数据中提取纯文本。
2. 返回提取的纯文本。
          ```
        