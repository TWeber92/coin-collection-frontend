export class GeoState {
  static #json = {};
  #geo;
  #pathData;
  #coinSize;
  #override;
  #numbers = [];
  constructor(obj) {
    obj = { ...GeoState.#json, ...obj };
    this.#geo = obj.geo;
    this.#pathData = obj.pathData;
    this.#numbers = obj.numbers;
    this.#override = obj.override;
    this.#coinSize = Math.max(18, Math.min(obj.coinSize * 0.45, 50));
    GeoState.#json = { ...GeoState.fromGeo(), ...obj };
  }

  get coinX() {
    const geo = this.#geo;
    return (
      geo?.x + this.#override?.xAdjust + geo?.width / 2 - this.#coinSize / 2
    );
  }
  get coinY() {
    const geo = this.#geo;
    return (
      geo?.y + this.#override?.yAdjust + geo?.height / 2 - this.#coinSize / 2
    );
  }
  get coinSize() {
    return this.#coinSize;
  }
  static fromGeo() {
    return {
      ...GeoState.#json,
      xCoords: [],
      yCoords: [],
    };
  }
  static fromSVG(obj) {
    return new GeoState(obj).#toEntity();
  }
  #toEntity() {
    return {
      size: this.#coinSize,
      x: this.coinX,
      y: this.coinY,
      geo: this.#geo,
    };
  }
}
