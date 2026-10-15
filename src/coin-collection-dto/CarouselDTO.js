import { USMapDTO } from "./USMapDTO.js";

export class CarouselDTO {
  #index;
  constructor(data) {
    this.#index = data.index;
  }

  to() {
    return {
      index: this.#index,
    };
  }

  static from(data) {
    return new CarouselDTO(data);
  }
}
