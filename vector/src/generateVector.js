const axios = require('axios');
const { exec } = require('child_process');

// Ollama 本地 API 地址
const ollamaApiUrl = 'http://localhost:11434/api/embed';  // 根据你的 Ollama 配置修改

// 处理组件信息并生成用于向量生成的文本
function generateComponentText(component) {
  const { name, description, props } = component;
  const propsText = props.map(p => `${p.name}: ${p.description}`).join(', ');
  return `
    组件名：${name}
    组件描述：${description}
  `
  return `${name} ${description} Props: ${propsText}`;
}

// 调用 Ollama API 获取向量
async function generateVector(text) {
  console.log('text', text);
  try {
    // 发送 POST 请求到 Ollama API
    const response = await axios.post(ollamaApiUrl, {
      input: text,
      model: 'deepseek-r1:14b',  // 使用 deepseek 模型，或者其他模型
    });

    // 获取并返回生成的向量
    const vector = response.data.embeddings[0];
    return vector;
  } catch (error) {
    console.error('Error generating vector:');
    throw error;
  }
}


async function generateVectorByComponent(component) {
  try {
    const text = generateComponentText(component);

    const vector = await generateVector(text)

    return vector;
  } catch (error) {
    console.error('Error generating vector:');
    throw error;
  }
}

// 生成向量函数
// function generateVector(text) {
//   return new Promise((resolve, reject) => {
//     exec(`ollama embed --text "${text}" --model deepseek-r1:14b`, (err, stdout, stderr) => {
//       if (err || stderr) {
//         reject(`Error: ${stderr || err}`);
//       }
//       console.log('stdout', stdout);
//       const vector = JSON.parse(stdout).embedding;
//       resolve(vector);
//     });
//   });
// }

module.exports = {
  generateVectorByComponent,
  generateVector
}
