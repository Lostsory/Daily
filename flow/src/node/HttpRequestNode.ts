import axios from "axios";
import { Context } from "../Context.js";
import { NodeBase, NodeExecutionResult } from "../type.js";

// HttpRequest 节点，定义详细的 input 类型
interface HttpRequestConfig {
  url: string;
  method?: string;  // 可选，默认为 GET
  data?: any;  // 请求数据，默认为空
}

type HttpRequestInput = Record<string, any>

type NewType = string;

// HttpRequest 节点
export class HttpRequestNode implements NodeBase {
  type = 'httpRequest';
  config: HttpRequestConfig;
  input: HttpRequestInput;
  output: NewType

  constructor(config: HttpRequestConfig, input: HttpRequestInput, output: string) {
    this.config = config;
    this.input = input;
    this.output = output;
  }

  async execute(context: Context): Promise<NodeExecutionResult> {
    const { url, method = "GET" } = this.config;  // 从 config 获取配置
    const { data = {} } = this.input;  // 从 input 获取请求数据
    const response = await axios({ url, method, data });

    // 将 HTTP 请求的响应数据存储到 context 中的唯一 output 字段
    context.set(this.output, response.data)

    return {
      data: response.data,
      isFlow: false
    }
  }
}

