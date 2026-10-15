
export class USMapDTO {
  #navPaths;
  #coins
  constructor(data){
    this.#navPaths = data.navPaths
    this.#coins = data.coins
  }

  to(){
    return {
      navPaths: this.#navPaths,
      coins: this.#coins
    }
  }

  static from(data){
    return new USMapDTO(data)
  }
}
