import { Context } from "../Context.js";
import { FlowNode, NodeBase, NodeExecutionResult } from "../type.js";

interface ConditionNodeConfig {
  expression: string;
  then?: FlowNode[];
  else?: FlowNode[];
}

type ConditionNodeInput = any

export class ConditionNode implements NodeBase {

  type = 'condition';
  config: ConditionNodeConfig;
  input: ConditionNodeInput;
  output: string

  constructor(config: ConditionNodeConfig, input: ConditionNodeInput, output: string) {
    this.config = config;
    this.input = input;
    this.output = output;
  }

  async execute(context: Context): Promise<NodeExecutionResult> {
    const { expression } = this.config;  // 获取条件表达式
    const func = new Function("context", `return ${expression};`);  // 创建一个函数来动态评估表达式

    const conditionResult = func(context);  // 执行条件表达式并返回结果

    // 判断条件结果，并选择执行的分支
    const branch = conditionResult ? this.input.then : this.input.else;

    return {
      data: branch,
      isFlow: true
    };
  }
}
