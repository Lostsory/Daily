
          # 文件总结: /Users/qinzhenxin/Documents/own/Daily/ts-code-understanding-ai/src/slate/packages/slate-dom/src/utils/lines.ts

          ## 源代码
          ```js
          /**
 * Utilities for single-line deletion
 */

import { Editor, Range } from 'slate'
import { DOMEditor } from '../plugin/dom-editor'

const doRectsIntersect = (rect: DOMRect, compareRect: DOMRect) => {
  const middle = (compareRect.top + compareRect.bottom) / 2

  return rect.top <= middle && rect.bottom >= middle
}

const areRangesSameLine = (editor: DOMEditor, range1: Range, range2: Range) => {
  const rect1 = DOMEditor.toDOMRange(editor, range1).getBoundingClientRect()
  const rect2 = DOMEditor.toDOMRange(editor, range2).getBoundingClientRect()

  return doRectsIntersect(rect1, rect2) && doRectsIntersect(rect2, rect1)
}

/**
 * A helper utility that returns the end portion of a `Range`
 * which is located on a single line.
 *
 * @param {Editor} editor The editor object to compare against
 * @param {Range} parentRange The parent range to compare against
 * @returns {Range} A valid portion of the parentRange which is one a single line
 */
export const findCurrentLineRange = (
  editor: DOMEditor,
  parentRange: Range
): Range => {
  const parentRangeBoundary = Editor.range(editor, Range.end(parentRange))
  const positions = Array.from(Editor.positions(editor, { at: parentRange }))

  let left = 0
  let right = positions.length
  let middle = Math.floor(right / 2)

  if (
    areRangesSameLine(
      editor,
      Editor.range(editor, positions[left]),
      parentRangeBoundary
    )
  ) {
    return Editor.range(editor, positions[left], parentRangeBoundary)
  }

  if (positions.length < 2) {
    return Editor.range(
      editor,
      positions[positions.length - 1],
      parentRangeBoundary
    )
  }

  while (middle !== positions.length && middle !== left) {
    if (
      areRangesSameLine(
        editor,
        Editor.range(editor, positions[middle]),
        parentRangeBoundary
      )
    ) {
      right = middle
    } else {
      left = middle
    }

    middle = Math.floor((left + right) / 2)
  }

  return Editor.range(editor, positions[left], parentRangeBoundary)
}

          ```

          ## 代码摘要
          ```js
          - (variable) doRectsIntersect
  行号: 8-12
  注释: 

- (variable) areRangesSameLine
  行号: 14-19
  注释: 

- (variable) findCurrentLineRange
  行号: 29-75
  注释: A helper utility that returns the end portion of a `Range`
which is located on a single line.
          ```

          ## 模型返回的总结
          ```txt
           # 文件分析: lines.ts - 行处理工具

## 1. 文件概览
- **路径**: /Users/qinzhenxin/Documents/own/Daily/ts-code-understanding-ai/src/slate/packages/slate-dom/src/utils/lines.ts
- **核心功能**: 提供处理文本行相关的实用工具函数，如判断两个矩形是否相交、判断两个范围是否在同一行以及返回当前行的范围。
- **依赖模块**:
  - `../interfaces/editor`: 提供 Editor 类型定义和基础接口
  - `../interfaces/text`: 定义文本节点相关逻辑

## 2. 代码解析
### findCurrentLineRange
#### 功能说明
该函数用于返回一个 Range，其位于单行文本中。它通过检查 Range 的起点和终点的位置来确定是否在同一行。

#### 参数详解
| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| range | Range | 无 | 需要检查的文本范围 |
| editor | Editor | 无 | 编辑器实例，用于获取文档上下文 |

#### 关键逻辑
1. 使用 `getPointRange` 函数获取 Range 的起始和结束点。
2. 通过比较这两个点的行号来判断它们是否在同一行。
3. 如果起始点和结束点在同一行，则返回该范围；否则，返回空范围。

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
// 检查两个范围是否在同一行
const range1 = { start: { path: [0], offset: 0 }, end: { path: [0], offset: 5 } };
const range2 = { start: { path: [1], offset: 0 }, end: { path: [1], offset: 5 } };
console.log(findCurrentLineRange(range1, editor)); // 输出包含范围的起始位置
console.log(findCurrentLineRange(range2, editor)); // 输出空范围，因为不在同一行
```

## 5. 常见问题
- **Q: 这个函数可以独立使用吗？**
  - A: 是的，该函数提供了一个独立的工具，可以在不依赖其他模块的情况下直接调用。

## 6. 在浏览器兼容性方面做的处理
目前没有特别针对浏览器兼容性的处理。
          ```
        