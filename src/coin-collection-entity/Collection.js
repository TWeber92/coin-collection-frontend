import { User } from "./User.js"

export class Collection {
    #favorites
    #archive
    #user
    constructor(data) {
        this.#favorites = data.favorites
        this.#archive = data.archive
        this.#user = User.from(data.user)
    }
    to(){
        return {
            favorites: this.#favorites,
            archive: this.#archive,
            user: this.#user.to()
        }
    }
    static from(data){
        return new Collection(data)
    }
}