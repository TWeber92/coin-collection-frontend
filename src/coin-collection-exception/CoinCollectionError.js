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
    this.node = CoinCollectionError.#node;
    this.x = CoinCollectionError.#x;
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
  toToast() {
    if (!this.node) return;

    this.node.hidden = false;
    setTimeout(() => (this.node.hidden = true), 8000);

    const time = document.createElement("span");
    time.textContent = new Date(this.toJSON().timestamp).toLocaleString(
      "en-US",
      {
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      },
    );
    this.node.replaceChildren(this.message, time, this.x);
  }

  static postErrorNode() {
    CoinCollectionError.#node = Object.assign(document.createElement("div"), {
      id: "overlay",
      className: "error-banner",
    });
    CoinCollectionError.#x = Object.assign(document.createElement("button"), {
      id: "close",
      innerHTML: "✕",
    });
    CoinCollectionError.#x.hidden = false;
    document.body.prepend(CoinCollectionError.#node);
    CoinCollectionError.#node.appendChild(CoinCollectionError.#x);
    CoinCollectionError.#node.hidden = true;
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
    this.#span = target.nextSibling;
  }
  toSpan() {
    const id = this.#input.id;
    const form = this.#input.form;
    const confirmSpan = form.confirm?.nextSibling;
    const text = this.message.split("⚠️,");
    this.#span.textContent = text[0];
    this.#span.hidden = false;
    if (text[1]) confirmSpan.textContent = text[1];
    const indentifier = id === "pin" ? this.#input.id : this.#input.type;
    const match = form[indentifier].value === this.#input.value;
    if (match) this.#input.setCustomValidity("");
  }
}

export class APIError extends CoinCollectionError {
  constructor(message, name, operation, status) {
    super({ message, name, operation, status });
  }
}
export class GetMeNotice extends CoinCollectionError {
  constructor(message) {
    super({ message, name: "GetMeNotice", operation: "getMe", status: 401 });
  }
}
export class EmailCopyNotice extends CoinCollectionError {
  constructor(message) {
    super({
      message,
      name: "EmailCopyNotice",
      operation: "getEmailNotice",
      status: 200,
    });
  }
}
export class LogoutNotice extends CoinCollectionError {
  constructor(message = "Logged out") {
    super({
      message,
      name: "LogoutNotice",
      operation: "logout",
      status: 200,
    });
  }
}
export class PasswordResetNotice extends CoinCollectionError {
  constructor(message = "Password updated") {
    super({
      message,
      name: "PasswordResetNotice",
      operation: "putPassword",
      status: 200,
    });
  }
}
export class LoginNotice extends CoinCollectionError {
  constructor(message = "Invalid credentials") {
    super({
      message,
      name: "LoginNotice",
      operation: "login",
      status: 401,
    });
  }
}
