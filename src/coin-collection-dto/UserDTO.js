export class UserDTO {
  #authenticated;
  #merged;
  #email;
  #collection;
  #createdAt;
  #message;
  constructor(data) {
    this.#authenticated = data.email ? true : false;
    this.#merged = data.merged || false;
    this.#email = data.email;
    this.#collection = data.collection;
    this.#createdAt = data.createdAt
      ? new Date(data.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        })
      : "—";
    this.#message = data.message;
  }

  to() {
    return {
      authenticated: this.#authenticated,
      merged: this.#merged,
      email: this.#email,
      collection: this.#collection,
      createdAt: this.#createdAt,
      message: this.#message,
    };
  }

  static from(data) {
    return new UserDTO(data);
  }
}
