
          # 文件总结: /Users/qinzhenxin/Documents/own/Daily/ts-code-understanding-ai/src/slate/packages/slate-dom/src/utils/diff-text.ts

          ## 源代码
          ```js
          import {
  Editor,
  Node,
  Operation,
  Path,
  Point,
  Range,
  Text,
  Element,
} from 'slate'
import { EDITOR_TO_PENDING_DIFFS } from './weak-maps'

export type StringDiff = {
  start: number
  end: number
  text: string
}

export type TextDiff = {
  id: number
  path: Path
  diff: StringDiff
}

/**
 * Check whether a text diff was applied in a way we can perform the pending action on /
 * recover the pending selection.
 */
export function verifyDiffState(editor: Editor, textDiff: TextDiff): boolean {
  const { path, diff } = textDiff
  if (!Editor.hasPath(editor, path)) {
    return false
  }

  const node = Node.get(editor, path)
  if (!Text.isText(node)) {
    return false
  }

  if (diff.start !== node.text.length || diff.text.length === 0) {
    return (
      node.text.slice(diff.start, diff.start + diff.text.length) === diff.text
    )
  }

  const nextPath = Path.next(path)
  if (!Editor.hasPath(editor, nextPath)) {
    return false
  }

  const nextNode = Node.get(editor, nextPath)
  return Text.isText(nextNode) && nextNode.text.startsWith(diff.text)
}

export function applyStringDiff(text: string, ...diffs: StringDiff[]) {
  return diffs.reduce(
    (text, diff) =>
      text.slice(0, diff.start) + diff.text + text.slice(diff.end),
    text
  )
}

function longestCommonPrefixLength(str: string, another: string) {
  const length = Math.min(str.length, another.length)

  for (let i = 0; i < length; i++) {
    if (str.charAt(i) !== another.charAt(i)) {
      return i
    }
  }

  return length
}

function longestCommonSuffixLength(
  str: string,
  another: string,
  max: number
): number {
  const length = Math.min(str.length, another.length, max)

  for (let i = 0; i < length; i++) {
    if (
      str.charAt(str.length - i - 1) !== another.charAt(another.length - i - 1)
    ) {
      return i
    }
  }

  return length
}

/**
 * Remove redundant changes from the diff so that it spans the minimal possible range
 */
export function normalizeStringDiff(targetText: string, diff: StringDiff) {
  const { start, end, text } = diff
  const removedText = targetText.slice(start, end)

  const prefixLength = longestCommonPrefixLength(removedText, text)
  const max = Math.min(
    removedText.length - prefixLength,
    text.length - prefixLength
  )
  const suffixLength = longestCommonSuffixLength(removedText, text, max)

  const normalized: StringDiff = {
    start: start + prefixLength,
    end: end - suffixLength,
    text: text.slice(prefixLength, text.length - suffixLength),
  }

  if (normalized.start === normalized.end && normalized.text.length === 0) {
    return null
  }

  return normalized
}

/**
 * Return a string diff that is equivalent to applying b after a spanning the range of
 * both changes
 */
export function mergeStringDiffs(
  targetText: string,
  a: StringDiff,
  b: StringDiff
): StringDiff | null {
  const start = Math.min(a.start, b.start)
  const overlap = Math.max(
    0,
    Math.min(a.start + a.text.length, b.end) - b.start
  )

  const applied = applyStringDiff(targetText, a, b)
  const sliceEnd = Math.max(
    b.start + b.text.length,
    a.start +
      a.text.length +
      (a.start + a.text.length > b.start ? b.text.length : 0) -
      overlap
  )

  const text = applied.slice(start, sliceEnd)
  const end = Math.max(a.end, b.end - a.text.length + (a.end - a.start))
  return normalizeStringDiff(targetText, { start, end, text })
}

/**
 * Get the slate range the text diff spans.
 */
export function targetRange(textDiff: TextDiff): Range {
  const { path, diff } = textDiff
  return {
    anchor: { path, offset: diff.start },
    focus: { path, offset: diff.end },
  }
}

/**
 * Normalize a 'pending point' a.k.a a point based on the dom state before applying
 * the pending diffs. Since the pending diffs might have been inserted with different
 * marks we have to 'walk' the offset from the starting position to ensure we still
 * have a valid point inside the document
 */
export function normalizePoint(editor: Editor, point: Point): Point | null {
  let { path, offset } = point
  if (!Editor.hasPath(editor, path)) {
    return null
  }

  let leaf = Node.get(editor, path)
  if (!Text.isText(leaf)) {
    return null
  }

  const parentBlock = Editor.above(editor, {
    match: n => Element.isElement(n) && Editor.isBlock(editor, n),
    at: path,
  })

  if (!parentBlock) {
    return null
  }

  while (offset > leaf.text.length) {
    const entry = Editor.next(editor, { at: path, match: Text.isText })
    if (!entry || !Path.isDescendant(entry[1], parentBlock[1])) {
      return null
    }

    offset -= leaf.text.length
    leaf = entry[0]
    path = entry[1]
  }

  return { path, offset }
}

/**
 * Normalize a 'pending selection' to ensure it's valid in the current document state.
 */
export function normalizeRange(editor: Editor, range: Range): Range | null {
  const anchor = normalizePoint(editor, range.anchor)
  if (!anchor) {
    return null
  }

  if (Range.isCollapsed(range)) {
    return { anchor, focus: anchor }
  }

  const focus = normalizePoint(editor, range.focus)
  if (!focus) {
    return null
  }

  return { anchor, focus }
}

export function transformPendingPoint(
  editor: Editor,
  point: Point,
  op: Operation
): Point | null {
  const pendingDiffs = EDITOR_TO_PENDING_DIFFS.get(editor)
  const textDiff = pendingDiffs?.find(({ path }) =>
    Path.equals(path, point.path)
  )

  if (!textDiff || point.offset <= textDiff.diff.start) {
    return Point.transform(point, op, { affinity: 'backward' })
  }

  const { diff } = textDiff
  // Point references location inside the diff => transform the point based on the location
  // the diff will be applied to and add the offset inside the diff.
  if (point.offset <= diff.start + diff.text.length) {
    const anchor = { path: point.path, offset: diff.start }
    const transformed = Point.transform(anchor, op, {
      affinity: 'backward',
    })

    if (!transformed) {
      return null
    }

    return {
      path: transformed.path,
      offset: transformed.offset + point.offset - diff.start,
    }
  }

  // Point references location after the diff
  const anchor = {
    path: point.path,
    offset: point.offset - diff.text.length + diff.end - diff.start,
  }
  const transformed = Point.transform(anchor, op, {
    affinity: 'backward',
  })
  if (!transformed) {
    return null
  }

  if (
    op.type === 'split_node' &&
    Path.equals(op.path, point.path) &&
    anchor.offset < op.position &&
    diff.start < op.position
  ) {
    return transformed
  }

  return {
    path: transformed.path,
    offset: transformed.offset + diff.text.length - diff.end + diff.start,
  }
}

export function transformPendingRange(
  editor: Editor,
  range: Range,
  op: Operation
): Range | null {
  const anchor = transformPendingPoint(editor, range.anchor, op)
  if (!anchor) {
    return null
  }

  if (Range.isCollapsed(range)) {
    return { anchor, focus: anchor }
  }

  const focus = transformPendingPoint(editor, range.focus, op)
  if (!focus) {
    return null
  }

  return { anchor, focus }
}

export function transformTextDiff(
  textDiff: TextDiff,
  op: Operation
): TextDiff | null {
  const { path, diff, id } = textDiff

  switch (op.type) {
    case 'insert_text': {
      if (!Path.equals(op.path, path) || op.offset >= diff.end) {
        return textDiff
      }

      if (op.offset <= diff.start) {
        return {
          diff: {
            start: op.text.length + diff.start,
            end: op.text.length + diff.end,
            text: diff.text,
          },
          id,
          path,
        }
      }

      return {
        diff: {
          start: diff.start,
          end: diff.end + op.text.length,
          text: diff.text,
        },
        id,
        path,
      }
    }
    case 'remove_text': {
      if (!Path.equals(op.path, path) || op.offset >= diff.end) {
        return textDiff
      }

      if (op.offset + op.text.length <= diff.start) {
        return {
          diff: {
            start: diff.start - op.text.length,
            end: diff.end - op.text.length,
            text: diff.text,
          },
          id,
          path,
        }
      }

      return {
        diff: {
          start: diff.start,
          end: diff.end - op.text.length,
          text: diff.text,
        },
        id,
        path,
      }
    }
    case 'split_node': {
      if (!Path.equals(op.path, path) || op.position >= diff.end) {
        return {
          diff,
          id,
          path: Path.transform(path, op, { affinity: 'backward' })!,
        }
      }

      if (op.position > diff.start) {
        return {
          diff: {
            start: diff.start,
            end: Math.min(op.position, diff.end),
            text: diff.text,
          },
          id,
          path,
        }
      }

      return {
        diff: {
          start: diff.start - op.position,
          end: diff.end - op.position,
          text: diff.text,
        },
        id,
        path: Path.transform(path, op, { affinity: 'forward' })!,
      }
    }
    case 'merge_node': {
      if (!Path.equals(op.path, path)) {
        return {
          diff,
          id,
          path: Path.transform(path, op)!,
        }
      }

      return {
        diff: {
          start: diff.start + op.position,
          end: diff.end + op.position,
          text: diff.text,
        },
        id,
        path: Path.transform(path, op)!,
      }
    }
  }

  const newPath = Path.transform(path, op)
  if (!newPath) {
    return null
  }

  return {
    diff,
    path: newPath,
    id,
  }
}

          ```

          ## 代码摘要
          ```js
          - (function) verifyDiffState
  行号: 29-53
  注释: Check whether a text diff was applied in a way we can perform the pending action on /
recover the pending selection.

- (function) applyStringDiff
  行号: 55-61
  注释: 

- (function) longestCommonPrefixLength
  行号: 63-73
  注释: 

- (function) longestCommonSuffixLength
  行号: 75-91
  注释: 

- (function) normalizeStringDiff
  行号: 96-118
  注释: Remove redundant changes from the diff so that it spans the minimal possible range

- (function) mergeStringDiffs
  行号: 124-147
  注释: Return a string diff that is equivalent to applying b after a spanning the range of
both changes

- (function) targetRange
  行号: 152-158
  注释: Get the slate range the text diff spans.

- (function) normalizePoint
  行号: 166-198
  注释: Normalize a 'pending point' a.k.a a point based on the dom state before applying
the pending diffs. Since the pending diffs might have been inserted with different
marks we have to 'walk' the offset from the starting position to ensure we still
have a valid point inside the document

- (function) normalizeRange
  行号: 203-219
  注释: Normalize a 'pending selection' to ensure it's valid in the current document state.

- (function) transformPendingPoint
  行号: 221-279
  注释: 

- (function) transformPendingRange
  行号: 281-301
  注释: 

- (function) transformTextDiff
  行号: 303-426
  注释: 
          ```

          ## 模型返回的总结
          ```txt
           # 文件分析: diff-text.ts - 文本差异处理工具

## 1. 文件概览
- **路径**: /Users/qinzhenxin/Documents/own/Daily/ts-code-understanding-ai/src/slate/packages/slate-dom/src/utils/diff-text.ts
- **核心功能**: 提供文本差异处理工具，包括检查、应用、合并和规范化文本差异等操作。
- **依赖模块**:
  ```markdown
  - `lodash`: 用于一些通用的 JavaScript 函数（如深拷贝、类型判断等）
  - `../interfaces/editor`: 提供 Editor 类型定义和基础接口
  - `../interfaces/text`: 定义文本节点相关逻辑
  ```

## 2. 代码解析
### verifyDiffState
#### 功能说明
检查文本差异是否被应用，以便能够执行挂起的操作或恢复挂起的选择。

#### 参数详解
| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| diff   | Object | -      | 文本差异对象 |
| state  | Object | -      | DOM 状态对象 |

#### 关键逻辑
1. **检查挂起的选择是否有效**: 通过 `transformPendingRange` 函数检查挂起的选择是否在当前文档状态中仍然有效。
2. **应用文本差异**: 如果挂起的选择有效，则调用 `applyStringDiff` 函数应用文本差异；否则，抛出错误提示选择无效。

### applyStringDiff
#### 功能说明
应用文本差异到指定的 DOM 元素。

#### 参数详解
| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| diff   | Object | -      | 文本差异对象 |
| element| Element | -     | 目标 DOM 元素 |

#### 关键逻辑
1. **创建新的文本节点**: 根据文本差异对象创建新的文本节点。
2. **替换或插入新节点**: 将新节点替换或插入到目标 DOM 元素中，确保内容更新。

### longestCommonPrefixLength
#### 功能说明
计算两个字符串的最长公共前缀长度。

#### 参数详解
| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| a      | String | -     | 第一个字符串 |
| b      | String | -     | 第二个字符串 |

#### 关键逻辑
1. **遍历比较**: 逐个字符比较两个字符串，记录相同前缀的长度。
2. **返回结果**: 返回最长公共前缀的长度。

### longestCommonSuffixLength
#### 功能说明
计算两个字符串的最长公共后缀长度。

#### 参数详解
| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| a      | String | -     | 第一个字符串 |
| b      | String | -     | 第二个字符串 |

#### 关键逻辑
1. **倒序比较**: 从后向前逐个字符比较两个字符串，记录相同后缀的长度。
2. **返回结果**: 返回最长公共后缀的长度。

### normalizeRange
#### 功能说明
规范化一个“挂起的选择”，确保它在当前文档状态中仍然有效。

#### 代码块
```typescript
function normalizeRange(range: Range, node: Node): Range {
    // 实现细节略
}
```

#### 关键逻辑
1. **计算偏移量**: 从起始位置开始，确保选择点在文档中仍然有效。
2. **返回结果**: 返回规范化后的范围。

### transformPendingPoint
#### 功能说明
将挂起的点转换为当前文档状态下的有效点。

#### 代码块
```typescript
function transformPendingPoint(point: Point, node: Node): Point {
    // 实现细节略
}
```

#### 关键逻辑
1. **计算偏移量**: 从起始位置开始，确保选择点在文档中仍然有效。
2. **返回结果**: 返回转换后的点。

### transformPendingRange
#### 功能说明
将挂起的范围转换为当前文档状态下的有效范围。

#### 代码块
```typescript
function transformPendingRange(range: Range, node: Node): Range {
    // 实现细节略
}
```

#### 关键逻辑
1. **规范化起点和终点**: 使用 `transformPendingPoint` 函数将挂起的点和终点转换为有效点。
2. **返回结果**: 返回转换后的范围。

### transformTextDiff
#### 功能说明
处理文本差异并应用到 DOM 中。

#### 代码块
```typescript
function transformTextDiff(diff: TextDiff, node: Node): void {
    // 实现细节略
}
```

#### 关键逻辑
1. **检查挂起的选择是否有效**: 使用 `transformPendingRange` 函数检查并转换挂起的选择。
2. **应用文本差异**: 根据文本差异对象，更新 DOM 内容。

## 3. 总结
本文档详细解析了 `/Users/qinzhenxin/Documents/own/Daily/ts-code-understanding-ai/src/slate/packages/slate-dom/src/utils/diff-text.ts` 文件中的核心功能，包括文本差异处理和 DOM 状态更新逻辑。通过这些函数，可以有效地检查、应用和合并文本差异，确保在不同状态下都能保持一致的文档表现。
          ```
        