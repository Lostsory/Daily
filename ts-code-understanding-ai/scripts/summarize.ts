import fs from "fs";
import path from "path";
import { spawn } from "child_process";
import { Ollama } from "./ollama.ts";

const AI = new Ollama()

// 扫描 src/slate 目录下的所有 .js 和 .ts 文件，排除配置文件
const slateDir = path.resolve("src/slate");

// 递归获取目录下所有的 .js 和 .ts 文件
function getFilesRecursive(dir: string): string[] {
  let results: string[] = [];

  // 读取目录中的所有文件
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    // 如果是目录，递归扫描
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursive(filePath));
    } else if (file.endsWith(".js") || file.endsWith(".ts")) {
      // 如果是 .js 或 .ts 文件，加入结果
      results.push(filePath);
    }
  });

  return results;
}

// console.log('getFilesRecursive', getFilesRecursive(slateDir));

const files = getFilesRecursive(slateDir).filter(file =>
  (file.endsWith(".js") || file.endsWith(".ts")) &&
  !file.endsWith("config.js")  // 排除 babel  jest  playwright 等其他配置文件
);

// 读取 parsed.json 文件
const parsedPath = path.resolve("data/parsed.json");

// 检查 parsed.json 文件是否存在
if (!fs.existsSync(parsedPath)) {
  console.error(`❌ 找不到 parsed.json 文件，请检查路径：${parsedPath}`);
  process.exit(1);
}

let items: any[] = [];
try {
  items = JSON.parse(fs.readFileSync(parsedPath, "utf-8")).map((item: any) => {
    return {
      ...item,
      file: path.resolve(slateDir, path.relative("src/slate", item.file))
    }
  });
} catch (err) {
  console.error("❌ 解析 parsed.json 时出错：", err);
  process.exit(1);
}

// 生成文件摘要
function generateSummary(filePath: string): string {
  try {
    const matchedItems = items.filter((item: any) => filePath === item.file);

    if (matchedItems.length === 0) {
      console.warn(`⚠️ 没有找到 ${filePath} 的结构数据`);
      return '';  // 返回空字符串，避免中断处理其他文件
    }

    // 构建摘要内容
    const content = matchedItems.map((item: any) => {
      let title = `- (${item.type}) ${item.name}`;
      if (item.class) title += ` [class: ${item.class}]`;
      const jsDoc = item.jsDoc?.join("；") || "";
      return `${title}\n  行号: ${item.startLine}-${item.endLine}\n  注释: ${jsDoc}`;
    }).join("\n\n");

    return content;
  } catch (err) {
    // console.error(`❌ 生成摘要时出错，文件：${filePath}，错误：${err}`);
    return ''; // 返回空字符串，避免中断其他文件的处理
  }
}

// 读取文件内容
function getFileContent(filePath: string): string {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (err) {
    // console.error(`❌ 读取文件内容时出错，文件：${filePath}，错误：${err}`);
    return ''; // 读取失败时返回空内容
  }
}

// 为每个文件生成 Markdown 摘要
async function main() {
  for (let file of files) {
    const filePath = file
    const summaryContent = generateSummary(filePath);


    if (summaryContent) {
      const fileContent = getFileContent(path.relative(process.cwd(), filePath)); // 获取源代码

      // 构造 Prompt
      const prompt = `
      你是一个资深前端开发助手，擅长代码分析和文档生成。请根据我提供的代码文件信息，生成一份结构清晰、内容完整的 Markdown 文档，要求如下：

      ### 1. 文档结构
      请按以下层级组织内容（Markdown 格式）：
      """
      # 文件分析: [文件名] - [核心功能一句话描述]

      ## 1. 文件概览
      - **路径**: [文件路径]
      - **核心功能**: [用 1~2 句话说明]
      - **依赖模块**: [列出所有 import 的模块及其用途]

      ## 2. 代码解析
      ### [函数/类名]
      #### 功能说明
      [用自然语言解释用途]

      #### 参数详解
      [用表格列出参数名、类型、默认值、说明]

      #### 关键逻辑
      [分步骤说明核心实现逻辑]

      ## 3. 依赖关系分析
      ### 依赖的模块
      [用列表或表格说明该文件依赖哪些外部模块，并描述用途]
      \`\`\`markdown
      - \`../interfaces/editor\`: 提供 Editor 类型定义和基础接口
      - \`../interfaces/text\`: 定义文本节点相关逻辑
      \`\`\`

      ### 被其他模块引用
      [说明该文件会被哪些其他模块调用]
      \`\`\`markdown
      - \`../commands/insert.ts\`: 在插入内容时调用此模块的查询功能
      \`\`\`

      ## 4. 使用示例
      [提供 2~3 个典型使用场景的代码示例]

      ## 5. 常见问题
      [列出 2~3 个可能的疑问及解答]

      ## 6. 在浏览器兼容性方面做的处理
      [列出当前文件所有的兼容性方面的处理]
      """

      ### 2. 具体要求
      1. **依赖关系分析**：
        - 显式列出所有 **import 语句** 对应的模块，并说明每个模块的用途
        - 推断该文件 **被哪些其他模块引用**（可根据项目结构合理推测）
        - 如果是通用工具函数，标注 **是否可独立使用**

      2. **注释处理**：
        - 将原有英文注释翻译为中文
        - 对无注释的代码段新增中文注释（解释代码意图）
        - 关键复杂逻辑需添加详细说明

      3. **函数/类说明**：
        - 每个方法需包含：
          * 功能描述
          * 参数说明（类型、默认值、约束条件）
          * 返回值说明
          * 可能的异常情况

      4. **代码示例**：
        - 示例要覆盖典型场景和边界条件
        - 示例代码需完整可运行（假设在正确上下文中）

      ### 3. 输入信息
      文件路径：${filePath}

      代码结构信息：
      ${summaryContent}

      ### 4. 输出要求
      - 使用 Markdown 语法
      - 中英文混排时优先使用中文
      - 技术术语保留英文（如 "Promise"、"callback"）
      - 代码块标注语言类型（如 \`\`\`typescript）
      `;

      console.log(`📤 正在请求本地模型，处理文件：${filePath}...`);

      try {
        const res = await AI.chat({
          model: 'deepseek-coder-v2:16b',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          stream: false,
        });

        if (res.status !== 200) {
          return
        }

        const modelOutput = res.data.message.content

        //  生成并保存 Markdown 文件
        const outputFilePath = path.resolve("output", `${path.basename(file, path.extname(file))}-summary.md`);
        const markdownContent = `
          # 文件总结: ${filePath}

          ## 源代码
          \`\`\`js
          ${fileContent}
          \`\`\`

          ## 代码摘要
          \`\`\`js
          ${summaryContent}
          \`\`\`

          ## 模型返回的总结
          \`\`\`txt
          ${modelOutput}
          \`\`\`
        `;

        try {
          fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });
          fs.writeFileSync(outputFilePath, markdownContent);
          console.log(`✅ ${filePath} 摘要已保存到: ${outputFilePath}`);
        } catch (err) {
          console.error(`❌ 保存文件时出错：${outputFilePath}，错误：${err}`);
        }
      } catch (error) {
        console.error(`❌ 模型处理失败，文件：${filePath}`, error);
      }
    } else {
      console.warn(`⚠️ 跳过文件：${file}，没有结构数据`);
    }
  };
}

main()

