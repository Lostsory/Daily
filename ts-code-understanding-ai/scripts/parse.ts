import { Project, ts } from "ts-morph";
import { globby } from "globby";
import fs from "fs";
import path from "path";

const SRC_DIR = path.resolve("src");
const OUTPUT_FILE = path.resolve("data/parsed.json");

function getVisibilityText(node: { hasModifier: (kind: ts.SyntaxKind) => boolean }) {
  if (node.hasModifier(ts.SyntaxKind.PrivateKeyword)) return "private";
  if (node.hasModifier(ts.SyntaxKind.ProtectedKeyword)) return "protected";
  return "public";
}

async function main() {
  const files = await globby(["**/*.ts", "**/*.js"], {
    cwd: SRC_DIR,
    absolute: true,
  });
  const project = new Project();
  const results: any[] = [];

  for (const filePath of files) {
    const sourceFile = project.addSourceFileAtPath(filePath);

    // 顶级函数
    sourceFile.getFunctions().forEach((fn) => {
      results.push({
        type: "function",
        name: fn.getName() || "anonymous",
        file: path.relative(process.cwd(), filePath),
        startLine: fn.getStartLineNumber(),
        endLine: fn.getEndLineNumber(),
        signature: fn.getText().slice(0, 300) + "...",
        jsDoc: fn.getJsDocs().map((doc) => doc.getComment()).filter(Boolean),
      });
    });

    // 顶级变量
    sourceFile.getVariableStatements().forEach((vs) => {
      vs.getDeclarations().forEach((decl) => {
        const name = decl.getName();
        const initializer = decl.getInitializer();
        results.push({
          type: "variable",
          name,
          isExported: vs.isExported(),
          file: path.relative(process.cwd(), filePath),
          startLine: decl.getStartLineNumber(),
          endLine: decl.getEndLineNumber(),
          value: initializer?.getText()?.slice(0, 300) || null,
          jsDoc: vs.getJsDocs().map((doc) => doc.getComment()).filter(Boolean),
        });
      });
    });

    // 类、类方法、类属性
    sourceFile.getClasses().forEach((cls) => {
      const className = cls.getName() || "UnnamedClass";

      // 类本体
      results.push({
        type: "class",
        name: className,
        file: path.relative(process.cwd(), filePath),
        startLine: cls.getStartLineNumber(),
        endLine: cls.getEndLineNumber(),
        jsDoc: cls.getJsDocs().map((doc) => doc.getComment()).filter(Boolean),
      });

      // 类方法
      cls.getMethods().forEach((method) => {
        results.push({
          type: "method",
          class: className,
          name: method.getName(),
          file: path.relative(process.cwd(), filePath),
          startLine: method.getStartLineNumber(),
          endLine: method.getEndLineNumber(),
          signature: method.getText().slice(0, 300) + "...",
          isStatic: method.isStatic(),
          visibility: getVisibilityText(method) || "public",
          jsDoc: method.getJsDocs().map((doc) => doc.getComment()).filter(Boolean),
        });
      });

      // 类属性字段
      cls.getProperties().forEach((prop) => {
        results.push({
          type: "classProperty",
          class: className,
          name: prop.getName(),
          file: path.relative(process.cwd(), filePath),
          startLine: prop.getStartLineNumber(),
          endLine: prop.getEndLineNumber(),
          isStatic: prop.isStatic(),
          visibility: getVisibilityText(prop) || "public",
          initializer: prop.getInitializer()?.getText()?.slice(0, 200) || null,
          jsDoc: prop.getJsDocs().map((doc) => doc.getComment()).filter(Boolean),
        });
      });
    });
  }

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2), "utf-8");
  console.log(`✅ Parsed ${results.length} items. Output: ${OUTPUT_FILE}`);
}

main().catch((err) => {
  console.error("❌ Error parsing project:", err);
});
