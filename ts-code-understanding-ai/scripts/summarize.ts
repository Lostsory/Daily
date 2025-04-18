import fs from "fs";
import path from "path";
import { spawn } from "child_process";

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
  !file.endsWith("babel.config.js") &&  // 排除 babel 配置文件
  !file.endsWith("jest.config.js") &&   // 排除 jest 配置文件
  !file.endsWith("playwright.config.ts")  // 排除 playwright 配置文件
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
    console.log(111, path.resolve(item.file));
    return {
      ...item,
      file: path.resolve(slateDir, path.relative("src/slate", item.file))
    }
  });
} catch (err) {
  console.error("❌ 解析 parsed.json 时出错：", err);
  process.exit(1);
}// 生成文件摘要
function generateSummary(filePath: string): string {
  console.log('filePath', filePath);
  try {
    const matchedItems = items.filter((item: any) => filePath === item.file);

    if (matchedItems.length === 0) {
      // console.warn(`⚠️ 没有找到 ${filePath} 的结构数据`);
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

// console.log('files', files);

// 为每个文件生成 Markdown 摘要
files.forEach(file => {
  const filePath = file
  const summaryContent = generateSummary(filePath);


  if (summaryContent) {
    const fileContent = getFileContent(path.relative(process.cwd(), filePath)); // 获取源代码

    // 构造 Prompt
    const prompt = `
    你是一个资深前端开发助手，请根据以下结构信息总结该文件的用途、包含的主要模块、功能点，并用自然语言进行简要说明：

    文件路径：${filePath}

    结构信息如下：

    ${summaryContent}

    希望可以对原有注释翻译成中文，并且根据原有解释新增注释，对于没有注释的地方也希望可以帮忙新增注释，如果有函数或类，请对其每个方法进行详细说明
`;

    console.log(`📤 正在请求本地模型，处理文件：${filePath}...`);

    console.log('filePath', filePath);
    // 调用本地 Ollama + Deepseek
    const child = spawn("ollama", ["run", "deepseek-r1:14b"], {
      stdio: ["pipe", "pipe", "inherit"],
    });

    // 向模型输入 Prompt
    child.stdin.write(prompt);
    child.stdin.end();

    let modelOutput = '';
    child.stdout.on('data', (data) => {
      modelOutput += data.toString();
    });

    child.on('close', (code) => {
      if (code === 0) {
        // 生成并保存 Markdown 文件
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
      } else {
        console.error(`❌ 模型处理失败，文件：${filePath}，退出码：${code}`);
      }
    });
  } else {
    // console.warn(`⚠️ 跳过文件：${file}，没有结构数据`);
  }
});
