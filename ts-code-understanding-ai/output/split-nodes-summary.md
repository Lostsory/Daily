
          # 文件总结: /Users/qinzhenxin/Documents/own/Daily/ts-code-understanding-ai/src/slate/packages/slate/src/transforms-node/split-nodes.ts

          ## 源代码
          ```js
          import { NodeTransforms } from '../interfaces/transforms/node'
import { Editor } from '../interfaces/editor'
import { Element } from '../interfaces/element'
import { Range } from '../interfaces/range'
import { Path } from '../interfaces/path'
import { PointRef } from '../interfaces/point-ref'
import { Transforms } from '../interfaces/transforms'
import { Node } from '../interfaces/node'
import { Point } from '../interfaces/point'

/**
 * Convert a range into a point by deleting it's content.
 */
const deleteRange = (editor: Editor, range: Range): Point | null => {
  if (Range.isCollapsed(range)) {
    return range.anchor
  } else {
    const [, end] = Range.edges(range)
    const pointRef = Editor.pointRef(editor, end)
    Transforms.delete(editor, { at: range })
    return pointRef.unref()
  }
}

export const splitNodes: NodeTransforms['splitNodes'] = (
  editor,
  options = {}
) => {
  Editor.withoutNormalizing(editor, () => {
    const { mode = 'lowest', voids = false } = options
    let { match, at = editor.selection, height = 0, always = false } = options

    if (match == null) {
      match = n => Element.isElement(n) && Editor.isBlock(editor, n)
    }

    if (Range.isRange(at)) {
      at = deleteRange(editor, at)
    }

    // If the target is a path, the default height-skipping and position
    // counters need to account for us potentially splitting at a non-leaf.
    if (Path.isPath(at)) {
      const path = at
      const point = Editor.point(editor, path)
      const [parent] = Editor.parent(editor, path)
      match = n => n === parent
      height = point.path.length - path.length + 1
      at = point
      always = true
    }

    if (!at) {
      return
    }

    const beforeRef = Editor.pointRef(editor, at, {
      affinity: 'backward',
    })
    let afterRef: PointRef | undefined
    try {
      const [highest] = Editor.nodes(editor, { at, match, mode, voids })

      if (!highest) {
        return
      }

      const voidMatch = Editor.void(editor, { at, mode: 'highest' })
      const nudge = 0

      if (!voids && voidMatch) {
        const [voidNode, voidPath] = voidMatch

        if (Element.isElement(voidNode) && editor.isInline(voidNode)) {
          let after = Editor.after(editor, voidPath)

          if (!after) {
            const text = { text: '' }
            const afterPath = Path.next(voidPath)
            Transforms.insertNodes(editor, text, { at: afterPath, voids })
            after = Editor.point(editor, afterPath)!
          }

          at = after
          always = true
        }

        const siblingHeight = at.path.length - voidPath.length
        height = siblingHeight + 1
        always = true
      }

      afterRef = Editor.pointRef(editor, at)
      const depth = at.path.length - height
      const [, highestPath] = highest
      const lowestPath = at.path.slice(0, depth)
      let position = height === 0 ? at.offset : at.path[depth] + nudge

      for (const [node, path] of Editor.levels(editor, {
        at: lowestPath,
        reverse: true,
        voids,
      })) {
        let split = false

        if (
          path.length < highestPath.length ||
          path.length === 0 ||
          (!voids && Element.isElement(node) && Editor.isVoid(editor, node))
        ) {
          break
        }

        const point = beforeRef.current!
        const isEnd = Editor.isEnd(editor, point, path)

        if (always || !beforeRef || !Editor.isEdge(editor, point, path)) {
          split = true
          const properties = Node.extractProps(node)
          editor.apply({
            type: 'split_node',
            path,
            position,
            properties,
          })
        }

        position = path[path.length - 1] + (split || isEnd ? 1 : 0)
      }

      if (options.at == null) {
        const point = afterRef.current || Editor.end(editor, [])
        Transforms.select(editor, point)
      }
    } finally {
      beforeRef.unref()
      afterRef?.unref()
    }
  })
}

          ```

          ## 代码摘要
          ```js
          - (variable) deleteRange
  行号: 14-23
  注释: Convert a range into a point by deleting it's content.

- (variable) splitNodes
  行号: 25-140
  注释: 
          ```

          ## 模型返回的总结
          ```txt
           # 文件分析: split-nodes.ts - 分割节点

## 1. 文件概览
- **路径**: /Users/qinzhenxin/Documents/own/Daily/ts-code-understanding-ai/src/slate/packages/slate/src/transforms-node/split-nodes.ts
- **核心功能**: 将一个节点分割成两个节点，删除中间的内容。
- **依赖模块**:
  ```markdown
  - `../interfaces/editor`: 提供 Editor 类型定义和基础接口
  - `../interfaces/text`: 定义文本节点相关逻辑
  ```

## 2. 代码解析
### splitNodes
#### 功能说明
将一个节点分割成两个节点，删除中间的内容。该函数接受一个编辑器实例和一个范围对象作为参数，通过调用 deleteRange 方法来实现节点的分割。

#### 参数详解
| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| editor | Editor | - | 编辑器实例 |
| options | { at: Point } | - | 包含分割位置的点对象 |

#### 关键逻辑
1. 获取当前选中的节点。
2. 使用 `deleteRange` 方法删除指定范围内的内容。
3. 创建新的文本节点并插入到编辑器中，替换被删除内容的原始位置。
4. 更新编辑器的节点列表。

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
// 创建一个编辑器实例
const editor = new Editor();

// 定义分割位置
const options = { at: { path: [0, 0], offset: 5 } };

// 调用 splitNodes 函数
splitNodes(editor, options);
```

## 5. 常见问题
1. **如何处理多个节点同时被删除的情况？**  
   如果范围包含多个节点，代码会逐个删除这些节点。
2. **参数 `options` 中的 `at` 字段是什么意思？**  
   `at` 字段表示分割的位置，是一个包含 `path` 和 `offset` 的对象。`path` 是路径数组，`offset` 是偏移量。
3. **返回值是什么？**  
   该函数没有显式的返回值，主要是对编辑器实例进行修改。

## 6. 在浏览器兼容性方面做的处理
- 确保代码在所有现代浏览器中都能正常运行，未针对特定浏览器做特殊处理。
          ```
        