import axios from "axios";
import type { AxiosInstance } from 'axios';

export class Ollama {

  private axiosInstance: AxiosInstance;
  constructor(baseURL: string = 'http://localhost:11434') {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000 * 60 * 5, // 30秒超时
    });
  }

  chat(params: {
    model: string;
    messages: { role: string; content: string }[];
    stream: boolean;
  }) {
    return this.axiosInstance.post('/api/chat', params);
  }
}
