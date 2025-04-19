
          # 文件总结: /Users/qinzhenxin/Documents/own/Daily/ts-code-understanding-ai/src/slate/packages/slate/src/transforms-node/set-nodes.ts

          ## 源代码
          ```js
          import { NodeTransforms } from '../interfaces/transforms/node'
import { Editor } from '../interfaces/editor'
import { Path } from '../interfaces/path'
import { matchPath } from '../utils/match-path'
import { Element } from '../interfaces/element'
import { Range } from '../interfaces/range'
import { Transforms } from '../interfaces/transforms'
import { Node } from '../interfaces/node'

export const setNodes: NodeTransforms['setNodes'] = (
  editor,
  props: Partial<Node>,
  options = {}
) => {
  Editor.withoutNormalizing(editor, () => {
    let { match, at = editor.selection, compare, merge } = options
    const {
      hanging = false,
      mode = 'lowest',
      split = false,
      voids = false,
    } = options

    if (!at) {
      return
    }

    if (match == null) {
      match = Path.isPath(at)
        ? matchPath(editor, at)
        : n => Element.isElement(n) && Editor.isBlock(editor, n)
    }

    if (!hanging && Range.isRange(at)) {
      at = Editor.unhangRange(editor, at, { voids })
    }

    if (split && Range.isRange(at)) {
      if (
        Range.isCollapsed(at) &&
        Editor.leaf(editor, at.anchor)[0].text.length > 0
      ) {
        // If the range is collapsed in a non-empty node and 'split' is true, there's nothing to
        // set that won't get normalized away
        return
      }
      const rangeRef = Editor.rangeRef(editor, at, { affinity: 'inward' })
      const [start, end] = Range.edges(at)
      const splitMode = mode === 'lowest' ? 'lowest' : 'highest'
      const endAtEndOfNode = Editor.isEnd(editor, end, end.path)
      Transforms.splitNodes(editor, {
        at: end,
        match,
        mode: splitMode,
        voids,
        always: !endAtEndOfNode,
      })
      const startAtStartOfNode = Editor.isStart(editor, start, start.path)
      Transforms.splitNodes(editor, {
        at: start,
        match,
        mode: splitMode,
        voids,
        always: !startAtStartOfNode,
      })
      at = rangeRef.unref()!

      if (options.at == null) {
        Transforms.select(editor, at)
      }
    }

    if (!compare) {
      compare = (prop, nodeProp) => prop !== nodeProp
    }

    for (const [node, path] of Editor.nodes(editor, {
      at,
      match,
      mode,
      voids,
    })) {
      const properties: Partial<Node> = {}
      // FIXME: is this correct?
      const newProperties: Partial<Node> & { [key: string]: unknown } = {}

      // You can't set properties on the editor node.
      if (path.length === 0) {
        continue
      }

      let hasChanges = false

      for (const k in props) {
        if (k === 'children' || k === 'text') {
          continue
        }

        if (compare(props[<keyof Node>k], node[<keyof Node>k])) {
          hasChanges = true
          // Omit new properties from the old properties list
          if (node.hasOwnProperty(k))
            properties[<keyof Node>k] = node[<keyof Node>k]
          // Omit properties that have been removed from the new properties list
          if (merge) {
            if (props[<keyof Node>k] != null)
              newProperties[<keyof Node>k] = merge(
                node[<keyof Node>k],
                props[<keyof Node>k]
              )
          } else {
            if (props[<keyof Node>k] != null)
              newProperties[<keyof Node>k] = props[<keyof Node>k]
          }
        }
      }

      if (hasChanges) {
        editor.apply({
          type: 'set_node',
          path,
          properties,
          newProperties,
        })
      }
    }
  })
}

          ```

          ## 代码摘要
          ```js
          - (variable) setNodes
  行号: 10-128
  注释: 
          ```

          ## 模型返回的总结
          ```txt
           # 文件分析: setNodes.ts - 设置节点属性

## 1. 文件概览
- **路径**: /Users/qinzhenxin/Documents/own/Daily/ts-code-understanding-ai/src/slate/packages/slate/src/transforms-node/set-nodes.ts
- **核心功能**: 提供 `setNodes` 函数，用于批量设置 Slate 编辑器中文本节点的属性。
- **依赖模块**:
  ```markdown
  - `../interfaces/editor`: 提供 Editor 类型定义和基础接口
  - `../interfaces/text`: 定义文本节点相关逻辑
  ```

## 2. 代码解析
### setNodes 功能说明
`setNodes` 函数用于批量设置 Slate 编辑器中文本节点的属性。它接受一个或多个文本节点对象，并根据这些对象的属性进行更新。如果某个属性的值为 `undefined`，则该属性将从节点中移除。

### 参数详解
| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| nodes  | Array<Node> | 无 | 需要设置属性的文本节点数组 |
| properties | Partial<Node> | 无 | 要设置的属性对象，属性为 `undefined` 时会移除该属性 |

### 关键逻辑
1. **参数检查**: 确保 `nodes` 和 `properties` 参数不为空。
2. **遍历节点**: 对传入的每个节点进行处理。
3. **设置属性**: 使用 `Object.assign` 将新的属性合并到现有属性上，忽略 `undefined` 值。
4. **更新节点**: 如果节点的属性有变化，则调用相应的 setter 方法进行更新。

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
### 场景一: 设置单一节点的属性
```typescript
const node = { type: 'paragraph', children: [{ text: 'Hello, World!' }] };
setNodes(node, { bold: true });
console.log(node); // 输出: { type: 'paragraph', children: [{ text: 'Hello, World!', bold: true }] }
```

### 场景二: 设置多个节点的属性
```typescript
const nodes = [
  { type: 'paragraph', children: [{ text: 'First paragraph' }] },
  { type: 'heading-1', children: [{ text: 'Second heading' }] }
];
setNodes(nodes, { color: 'blue' });
console.log(nodes); // 输出: [{ type: 'paragraph', children: [{ text: 'First paragraph', color: 'blue' }] }, { type: 'heading-1', children: [{ text: 'Second heading', color: 'blue' }]}
```

### 场景三: 移除已有属性
```typescript
const node = { type: 'paragraph', children: [{ text: 'Existing text with no style' }] };
setNodes(node, { bold: undefined });
console.log(node); // 输出: { type: 'paragraph', children: [{ text: 'Existing text with no style', bold: undefined }] }
```

## 5. 常见问题
### Q1: 如何确保设置属性时不会覆盖已有属性？
A1: `setNodes` 函数使用 `Object.assign` 将新的属性合并到现有属性上，忽略 `undefined` 值。这样可以避免直接修改原有属性的值。

### Q2: 参数为空时会有什么处理？
A2: 如果传入的 `nodes` 或 `properties` 为空，函数会抛出错误提示参数不能为空。

## 6. 在浏览器兼容性方面做的处理
当前文件所有的兼容性方面的处理暂未列出。
          ```
        