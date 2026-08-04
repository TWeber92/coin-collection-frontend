export class GeoState {
  #geo;
  #pathData;
  #coinSize;
  #override;
  #numbers = [];
  constructor(obj) {
    this.#pathData = obj.pathData;
    this.#numbers = obj.numbers?.match(/[-+]?(\d*\.\d+|\d+\.?)/g);
    this.#override = obj.override;
    this.#coinSize = Math.max(18, Math.min(obj.coinSize * 0.45, 50));
  }

  get coinX() {
    const geo = this.#geo;
    return geo.x + this.#override.xAdjust + geo.width / 2 - this.#coinSize / 2;
  }
  get coinY() {
    const geo = this.#geo;
    return geo.y + this.#override.yAdjust + geo.height / 2 - this.#coinSize / 2;
  }
  set geo(obj) {
    this.#geo = obj;
  }
  get coinSize() {
    return this.#coinSize;
  }
  fromGeo() {
    return {
      numbers: this.#numbers,
      pathData: this.#pathData,
      xCoords: [],
      yCoords: [],
    };
  }
  fromSVG(obj) {
    new GeoState(obj);
  }
  toEntity() {
    return {
      size: this.#coinSize,
      x: this.coinX,
      y: this.coinY,
      geo: this.#geo,
    };
  }
}
