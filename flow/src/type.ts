import { Context } from "./Context.js";

export interface NodeBase {
  type: string;
  config: any;
  input: any;
  output: string;
  execute(context: Context): Promise<NodeExecutionResult>;
}

export interface NodeExecutionResult {
  data: any;
  isFlow: boolean;
}

export type FlowNode = Pick<NodeBase, "type" | "config" | "input" | "output">

export type Flow = FlowNode[]
