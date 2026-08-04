export class UserDTO {
  #authenticated;
  #userName;
  #collection;
  #permissions;
  #roles;
  constructor(entity) {
    entity = { ...this.#toJSON(), ...entity };
    this.#authenticated = entity.authenticated;
    this.#userName = entity.userName;
    this.#collection = {
      favorites: entity.collection?.favorites.names,
      archive: entity.collection?.archive.names,
    };
  }

  #toJSON() {
    return {
      authenticated: this.#authenticated,
      userName: this.#userName,
      collection: this.#collection,
    };
  }

  static fromEntity(entity) {
    return new UserDTO(entity).#toJSON();
  }
}
