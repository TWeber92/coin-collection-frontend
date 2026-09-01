export class DocumentStore {
  constructor(element, options) {
    Object.assign(element, options);
    this.element = element;
  }

  get node() {
    return this.element;
  }

  static createHeaderElement(attributes) {
    const { element, options } = DocumentStore.#setOptions(
      document.createElement("header"),
      attributes,
    );
    return new DocumentStore(element, options);
  }
  static createNavElement(attributes) {
    const { element, options } = DocumentStore.#setOptions(
      document.createElement("nav"),
      attributes,
    );
    return new DocumentStore(element, options);
  }
  static createDivElement(attributes) {
    const { element, options } = DocumentStore.#setOptions(
      document.createElement("div"),
      attributes,
    );
    return new DocumentStore(element, options);
  }
  static createSvgElement(attributes) {
    const { width, height, x, y } = attributes;
    const { element, options } = DocumentStore.#setOptions(
      document.createElementNS("http://www.w3.org/2000/svg", "svg"),
      attributes,
    );
    const svg = new DocumentStore(element, { id: options.id }).node;
    svg.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
    return svg;
  }
  static createForeignObjectElement(attributes) {
    const { width, height, x, y } = attributes;
    const { element, options } = DocumentStore.#setOptions(
      document.createElementNS("http://www.w3.org/2000/svg", "foreignObject"),
      attributes,
    );
    return new DocumentStore(element, { ...options, width, height, x, y });
  }
  static #setOptions(element, attributes) {
    if (attributes.data)
      Object.entries(attributes.data).forEach(
        ([key, value]) => (element.dataset[key] = value),
      );
    return {
      element,
      options: {
        id: attributes.id,
        className: attributes.className,
        hidden: attributes.hidden,
      },
    };
  }
}
