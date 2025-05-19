import { Context } from "../Context.js";
import { executeFlow } from "../executeFlow.js";
import { FlowNode, NodeBase, NodeExecutionResult } from "../type.js";


interface LoopNodeConfig {
  times: number;
  body: FlowNode[];
}

interface LoopNodeInput {

}

export class LoopNode implements NodeBase {
  type = 'loop';
  config: LoopNodeConfig;
  input: LoopNodeInput;
  output: string

  constructor(config: LoopNodeConfig, input: LoopNodeInput, output: string) {
    this.config = config;
    this.input = input;
    this.output = output;
  }

  // 执行循环
  async execute(context: Context): Promise<NodeExecutionResult> {
    const { times, body } = this.config;

    for (let i = 0; i < times; i++) {
      await executeFlow(body, context);
    }

    // 返回循环后的结果（如果有必要可以在循环体内设置输出）
    return { data: null, isFlow: false };
  }
}
