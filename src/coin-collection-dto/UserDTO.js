export class UserDTO {
  static #json = {};
  #authenticated;
  #userName;
  #collection;
  #permissions;
  #roles;
  constructor(entity) {
    entity = { ...UserDTO.#json, ...entity };
    this.#authenticated = entity.authenticated;
    this.#userName = entity.userName;
    this.#collection = {
      favorites: entity.collection?.favorites?.names,
      archive: entity.collection?.archive?.names,
    };
    UserDTO.#json = this.#toJSON();
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
