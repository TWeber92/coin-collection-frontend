export class User {
  #email;
  #collection
  #createdAt
  #message
  constructor(data) {
    this.#email = data.email;
    this.#collection = data.collection
    this.#createdAt = data.createdAt
    this.#message = data.message
  }

  to() {
    return {
      email: this.#email,
      collection: this.#collection,
      createdAt: this.#createdAt,
      message: this.#message
    };
  }

  static from(data) {
    return new User(data);
  }
}
