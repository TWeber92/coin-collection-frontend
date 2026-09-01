export class CoinCollectionError extends Error {
  static #node;
  static #x;
  #name;
  #operation;
  #status;
  #timestamp;

  constructor({ message, name, operation, status }) {
    super(message);
    this.#name = name;
    this.#operation = operation;
    this.#status = status;
    this.#timestamp = new Date().toISOString();
  }

  toJSON() {
    return {
      message: this.message,
      name: this.#name,
      operation: this.#operation,
      status: this.#status,
      timestamp: this.#timestamp,
    };
  }

  static postErrorNode() {
    CoinCollectionError.#node = Object.assign(document.createElement("div"), {
      id: "error-node",
      className: "error-banner hidden",
    });
    CoinCollectionError.#x = Object.assign(document.createElement("div"), {
      className: "close",
      innerHTML: "&times;",
    });
    CoinCollectionError.#x.dataset.active = "false";
    document.body.prepend(CoinCollectionError.#node);
    CoinCollectionError.#node.appendChild(CoinCollectionError.#x);
  }

  static get node() {
    return CoinCollectionError.#node;
  }
  static get x() {
    return CoinCollectionError.#x;
  }
}

export class ValidationError extends CoinCollectionError {
  #input;
  #span;
  constructor({ target, name, message, operation }) {
    super({ message: Object.values(message), name, operation, status: 400 }); // 👈 object
    this.#input = target;
    this.#span = target.nextElementSibling;
  }
  toSpan() {
    const form = this.#input.form;
    const confirmSpan = form.confirm?.nextElementSibling;
    const text = this.message.split("⚠️,");
    this.#span.textContent = text[0];
    this.#span.hidden = false;
    if (text[1]) confirmSpan.textContent = text[1];
    const match =
      this.#input.form[this.#input.type].value === this.#input.value;
    if (match) this.#input.setCustomValidity("");
  }
}

export class APIError extends CoinCollectionError {
  constructor(message, name, operation, status) {
    super({ message, name, operation, status });
    this.node = CoinCollectionError.node;
    this.x = CoinCollectionError.x;
  }

  toToast() {
    if (!this.node) return;

    this.node.dataset.active = "true";
    setTimeout(() => (this.node.dataset.active = "false"), 8000);

    const time = document.createElement("span");
    time.textContent = this.toJSON().timestamp;
    this.node.replaceChildren(this.message, time, this.x);
  }
}
