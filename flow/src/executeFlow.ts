import { Context } from "./Context.js";
import { createNode } from "./node/index.js";
import { Flow, NodeBase, NodeExecutionResult } from "./type.js";

export async function executeFlow(flow: Flow, context: Context): Promise<void> {
  for (const flowNode of flow) {
    // 根据节点配置创建节点实例
    const node: NodeBase = createNode(flowNode);

    // 执行节点，并将结果直接更新到context
    const result = await node.execute(context);
    if (result.isFlow) {
      // 如果结果是一个flow，则递归执行
      await executeFlow(result.data, context);
    }
  }
}
