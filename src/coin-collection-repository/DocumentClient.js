export class DocumentClient {
  constructor(element, method) {
    this.element = element;
    this.method = method;
  }
  DOC(element) {
    this.method(element);
  }
  GET(element) {
    this.DOC(element);
  }
  POST(element) {
    this.DOC(element);
  }
  PUT(element) {
    this.DOC(element);
  }
  DELETE(element) {
    this.DOC(element);
  }
}
