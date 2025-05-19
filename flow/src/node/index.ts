import { FlowNode } from "../type.js";
import { ConditionNode } from "./ConditionNode.js"
import { HttpRequestNode } from "./HttpRequestNode.js"

export function createNode(node: FlowNode) {
  const { type, config, input, output } = node
  switch (type) {
    case "httpRequest":
      return new HttpRequestNode(config, input, output);
    // case "customFunction":
    //   return new CustomFunctionNode(.config, .input, .output);
    case "condition":
      return new ConditionNode(config, input, output);
    // 可以继续扩展其他节点类型
    default:
      throw new Error(`Unknown node type: ${type}`);
  }
}
