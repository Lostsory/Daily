export class Context {
  [key: string]: any;
  customFunctionMap: Map<string, Function> = new Map();
  getTimestamp() {
    return Date.now();
  }

  set(key: string, value: any) {
    this[key] = value;
  }
  get(key: string) {
    return this[key];
  }
}
