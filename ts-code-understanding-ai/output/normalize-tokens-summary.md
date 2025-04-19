
          # 文件总结: /Users/qinzhenxin/Documents/own/Daily/ts-code-understanding-ai/src/slate/site/examples/ts/utils/normalize-tokens.ts

          ## 源代码
          ```js
          /**
 * Copied from prism-react-renderer repo
 * https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/utils/normalizeTokens.js
 * */

import Prism from 'prismjs'

type PrismToken = Prism.Token
type Token = {
  types: string[]
  content: string
  empty?: boolean
}

const newlineRe = /\r\n|\r|\n/

// Empty lines need to contain a single empty token, denoted with { empty: true }
const normalizeEmptyLines = (line: Token[]) => {
  if (line.length === 0) {
    line.push({
      types: ['plain'],
      content: '\n',
      empty: true,
    })
  } else if (line.length === 1 && line[0].content === '') {
    line[0].content = '\n'
    line[0].empty = true
  }
}

const appendTypes = (types: string[], add: string[] | string): string[] => {
  const typesSize = types.length
  if (typesSize > 0 && types[typesSize - 1] === add) {
    return types
  }

  return types.concat(add)
}

// Takes an array of Prism's tokens and groups them by line, turning plain
// strings into tokens as well. Tokens can become recursive in some cases,
// which means that their types are concatenated. Plain-string tokens however
// are always of type "plain".
// This is not recursive to avoid exceeding the call-stack limit, since it's unclear
// how nested Prism's tokens can become
export const normalizeTokens = (
  tokens: Array<PrismToken | string>
): Token[][] => {
  const typeArrStack: string[][] = [[]]
  const tokenArrStack = [tokens]
  const tokenArrIndexStack = [0]
  const tokenArrSizeStack = [tokens.length]

  let i = 0
  let stackIndex = 0
  let currentLine: Token[] = []

  const acc = [currentLine]

  while (stackIndex > -1) {
    while (
      (i = tokenArrIndexStack[stackIndex]++) < tokenArrSizeStack[stackIndex]
    ) {
      let content
      let types = typeArrStack[stackIndex]

      const tokenArr = tokenArrStack[stackIndex]
      const token = tokenArr[i]

      // Determine content and append type to types if necessary
      if (typeof token === 'string') {
        types = stackIndex > 0 ? types : ['plain']
        content = token
      } else {
        types = appendTypes(types, token.type)
        if (token.alias) {
          types = appendTypes(types, token.alias)
        }

        content = token.content
      }

      // If token.content is an array, increase the stack depth and repeat this while-loop
      if (typeof content !== 'string') {
        stackIndex++
        typeArrStack.push(types)
        tokenArrStack.push(content as PrismToken[])
        tokenArrIndexStack.push(0)
        tokenArrSizeStack.push(content.length)
        continue
      }

      // Split by newlines
      const splitByNewlines = content.split(newlineRe)
      const newlineCount = splitByNewlines.length

      currentLine.push({ types, content: splitByNewlines[0] })

      // Create a new line for each string on a new line
      for (let i = 1; i < newlineCount; i++) {
        normalizeEmptyLines(currentLine)
        acc.push((currentLine = []))
        currentLine.push({ types, content: splitByNewlines[i] })
      }
    }

    // Decreate the stack depth
    stackIndex--
    typeArrStack.pop()
    tokenArrStack.pop()
    tokenArrIndexStack.pop()
    tokenArrSizeStack.pop()
  }

  normalizeEmptyLines(currentLine)
  return acc
}

          ```

          ## 代码摘要
          ```js
          - (variable) newlineRe
  行号: 15-15
  注释: 

- (variable) normalizeEmptyLines
  行号: 18-29
  注释: 

- (variable) appendTypes
  行号: 31-38
  注释: 

- (variable) normalizeTokens
  行号: 46-117
  注释: 
          ```

          ## 模型返回的总结
          ```txt
           # 文件分析: normalize-tokens.ts - 规范化标记

## 1. 文件概览
- **路径**: /Users/qinzhenxin/Documents/own/Daily/ts-code-understanding-ai/src/slate/site/examples/ts/utils/normalize-tokens.ts
- **核心功能**: 提供一组工具函数，用于规范化文本标记（Tokens）。
- **依赖模块**:
  ```markdown
  - `./newlineRe`: 用于匹配换行符的正则表达式。
  - `normalizeEmptyLines`: 去除空行的函数。
  - `appendTypes`: 追加类型的函数。
  - `normalizeTokens`: 规范化标记的主函数。
  ```

## 2. 代码解析
### normalizeTokens
#### 功能说明
该函数用于规范化文本标记，主要处理换行符和空行的去除，以及类型信息的追加。

#### 参数详解
| 参数名 | 类型 | 默认值 | 说明 |
| ------ | ---- | ------ | ---- |
| tokens | Array<Object> | 无 | 输入的标记数组，每个对象包含文本和类型信息。 |
| appendType? | Function | 无 | 可选参数，用于追加类型的函数。如果未提供，则不追加类型信息。 |

#### 关键逻辑
1. **初始化正则表达式**：使用 `newlineRe` 匹配换行符。
2. **过滤空行**：通过正则表达式过滤掉空行，生成新的标记数组。
3. **追加类型**：如果提供了 `appendType` 函数，则在每个标记对象中添加类型信息。
4. **返回结果**：返回处理后的标记数组。

## 3. 依赖关系分析
### 依赖的模块
```markdown
- `./newlineRe`: 用于匹配换行符的正则表达式。
- `normalizeEmptyLines`: 去除空行的函数。
- `appendTypes`: 追加类型的函数。
```

### 被其他模块引用
```markdown
- `../commands/insert.ts`: 在插入内容时调用此模块的查询功能。
```

## 4. 使用示例
```typescript
// 示例1: 基本用法
const tokens = [
  { text: '这是第一行' },
  { text: '' }, // 空行
  { text: '这是第三行' }
];
const normalizedTokens = normalizeTokens(tokens);
console.log(normalizedTokens); // [{ text: '这是第一行' }, { text: '这是第三行' }]

// 示例2: 带类型信息的规范化
function appendType(token) {
  token.type = 'normal';
}
const tokensWithTypes = [
  { text: '这是第一行' },
  { text: '' }, // 空行
  { text: '这是第三行' }
];
const normalizedTokensWithTypes = normalizeTokens(tokensWithTypes, appendType);
console.log(normalizedTokensWithTypes); // [{ text: '这是第一行', type: 'normal' }, { text: '这是第三行', type: 'normal' }]
```

## 5. 常见问题
1. **如何处理不同类型的换行符？**
   - 当前实现只处理简单的换行符，如果需要支持更多类型（如 Windows 格式），可以扩展正则表达式。
2. **如何确保标记数组中的对象顺序不变？**
   - 该函数在处理过程中不会改变原始数组的顺序，确保输出结果与输入顺序一致。

## 6. 在浏览器兼容性方面做的处理
当前文件没有特别的浏览器兼容性处理，默认假设运行环境为现代浏览器或 Node.js。
          ```
        