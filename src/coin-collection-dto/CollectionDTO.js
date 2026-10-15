import { HeaderDTO } from "./HeaderDTO.js";
import { UserDTO } from "./UserDTO.js";

export class CollectionDTO {
  #favorites;
  #archive;
  #user;
  #header
  constructor(data){
    this.#favorites = data.favorites;//node
    this.#archive = data.archive;//node
    this.#user = UserDTO.from(data.user)//user object
    this.#header = HeaderDTO.from(data.user.collection)//array names length x2
  }

  to(){
    return {
      favorites: this.#favorites,
      archive: this.#archive,
      user: this.#user.to(),
      header: this.#header.to()
    }
  }
  static from(data){
    return new CollectionDTO(data)
  }
}
