export class DocumentClient {
  constructor() {
  }
  DOC(value, method) {
    return method(value);
  }
  GET(value, method) {
    return this.DOC(value, method);
  }
  POST(value, method) {
    return this.DOC(value, method);
  }
  PUT(value, method) {
    return this.DOC(value, method);
  }
  DELETE(value, method) {
    return this.DOC(value, method);
  }
}
