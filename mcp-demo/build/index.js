import { OpenAI } from 'openai';
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import readline from "readline/promises";
import dotenv from "dotenv";
import resolveBin from 'resolve-bin';
import fs from 'fs';
import path from 'path';
dotenv.config();
const ANTHROPIC_API_KEY = process.env.OPENAI_API_KEY;
if (!ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY is not set");
}
function isLocalScriptPath(input) {
    const resolved = path.resolve(input);
    return fs.existsSync(resolved) && fs.statSync(resolved).isFile();
}
function isBinName(input) {
    return !isLocalScriptPath(input);
}
const getServerScriptPath = async (input) => {
    if (isLocalScriptPath(input)) {
        return input;
    }
    else {
        return await resolveBin.sync(input);
    }
};
class MCPClient {
    mcp;
    openai;
    transport = null;
    tools = [];
    constructor() {
        this.openai = new OpenAI({
            apiKey: ANTHROPIC_API_KEY,
            baseURL: 'https://api.deepseek.com',
        });
        this.mcp = new Client({ name: "mcp-client-cli", version: "1.0.0" });
    }
    async connectToServer(serverScriptPath) {
        try {
            const url = await getServerScriptPath(serverScriptPath);
            const isJs = url.endsWith(".js");
            const isPy = url.endsWith(".py");
            if (!isJs && !isPy) {
                throw new Error("Server script must be a .js or .py file");
            }
            console.log('url', url);
            this.transport = new StdioClientTransport({
                command: 'node',
                args: [url],
                env: process.env
            });
            this.mcp.connect(this.transport);
            const toolsResult = await this.mcp.listTools();
            this.tools = toolsResult.tools.map((tool) => {
                return {
                    type: "function",
                    function: {
                        name: tool.name,
                        description: tool.description,
                        parameters: tool.inputSchema,
                    }
                };
            });
            console.log("Connected to server with tools:", this.tools.map((tool) => tool.function.name));
        }
        catch (e) {
            console.log("Failed to connect to MCP server: ", e);
            throw e;
        }
    }
    async processQuery(query) {
        const messages = [
            {
                role: "user",
                content: query,
            },
        ];
        const response = await this.openai.chat.completions.create({
            model: 'deepseek-chat',
            messages: messages,
            tools: this.tools,
        });
        const toolResults = [];
        const msg = response.choices[0].message;
        for (const content of (msg.tool_calls || [])) {
            const toolName = content.function.name;
            const toolArgs = JSON.parse(content.function.arguments);
            const result = await this.mcp.callTool({
                name: toolName,
                arguments: toolArgs,
            });
            toolResults.push(JSON.stringify(result));
            console.warn(`[Calling tool ${toolName} with args ${JSON.stringify(toolArgs)}]`);
        }
        return toolResults.join("\n");
    }
    async chatLoop() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        try {
            console.log("\nMCP Client Started!");
            console.log("Type your queries or 'quit' to exit.");
            while (true) {
                const message = await rl.question("\nQuery: ");
                if (message.toLowerCase() === "quit") {
                    break;
                }
                const response = await this.processQuery(message);
                console.log("\n" + response);
            }
        }
        catch (e) {
            console.log("Error: ", e);
        }
        finally {
            rl.close();
        }
    }
    async cleanup() {
        await this.mcp.close();
    }
}
async function main() {
    if (process.argv.length < 3) {
        console.log("Usage: node index.ts <path_to_server_script>");
        return;
    }
    const mcpClient = new MCPClient();
    try {
        await mcpClient.connectToServer(process.argv[2]);
        await mcpClient.chatLoop();
    }
    finally {
        await mcpClient.cleanup();
        process.exit(0);
    }
}
main();
