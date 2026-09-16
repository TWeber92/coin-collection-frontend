import { GeoState } from "./GeoState.js";

export class GeoUtility {
  static #POSITION_OVERRIDES = {
    ID: { xAdjust: -10, yAdjust: 15 },
    RI: { xAdjust: 9, yAdjust: 9 },
    DE: { xAdjust: 16, yAdjust: 10 },
    CA: { xAdjust: -17, yAdjust: 0 },
    AK: { xAdjust: 40, yAdjust: 0 },
    HI: { xAdjust: 150, yAdjust: 95 },
    LA: { xAdjust: -20, yAdjust: 0 },
    VA: { xAdjust: 10, yAdjust: 3 },
    NH: { xAdjust: 0, yAdjust: 15 },
    MA: { xAdjust: 6, yAdjust: -3 },
    NJ: { xAdjust: 10, yAdjust: 5 },
    MN: { xAdjust: -10, yAdjust: 0 },
    MI: { xAdjust: -260, yAdjust: 10 },
  };

  static #getPositionOverrides(id) {
    return GeoUtility.#POSITION_OVERRIDES[id] || { xAdjust: 0, yAdjust: 0 };
  }

  static async #getStatePathsGeometry() {
    let currentX = 0;
    let currentY = 0;
    const { numbers, pathData, xCoords, yCoords } = GeoState.fromGeo();
    for (let i = 0; i < numbers.length; i += 2) {
      if (i + 1 < numbers.length) {
        const x = parseFloat(numbers[i]);
        const y = parseFloat(numbers[i + 1]);
        if (pathData?.includes("m") || pathData?.includes("l")) {
          currentX += x;
          currentY += y;
          xCoords.push(currentX);
          yCoords.push(currentY);
        } else {
          xCoords.push(x);
          yCoords.push(y);
        }
      }
    }
    return GeoState.fromSVG({
      geo: {
        x: Math.min(...xCoords),
        y: Math.min(...yCoords),
        width: Math.max(...xCoords) - Math.min(...xCoords),
        height: Math.max(...yCoords) - Math.min(...yCoords),
      },
    });
  }

  static async getGeometryForSlide(path) {
    const pathData = path.getAttribute("d");
    const numbers = pathData.match(/[-+]?(\d*\.\d+|\d+\.?)/g);
    GeoState.fromSVG({
      pathData,
      numbers,
    });
    return await this.#getStatePathsGeometry(); //{ #fromEntity }
  }

  static async getPositionForCoin(path) {
    const id = path.dataset.id;
    const bbox = path.getBBox();
    const pathData = path.getAttribute("d");
    const geoMean = Math.sqrt(bbox.width * bbox.height);
    const coinSize = Math.max(50, Math.min(geoMean * 0.85, 150));
    const override = this.#getPositionOverrides(id);
    const numbers = pathData.match(/[-+]?(\d*\.\d+|\d+\.?)/g);
    GeoState.fromSVG({
      pathData,
      numbers,
      override,
      coinSize,
    });
    return await this.#getStatePathsGeometry();
  }
}
