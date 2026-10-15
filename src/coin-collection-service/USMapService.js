import { USMapDTO } from "../coin-collection-dto/USMapDTO.js";
import { UsMap } from "../coin-collection-entity/UsMap.js";
import { GeoUtility } from "../coin-collection-utility/GeoUtility.js";
import { UsMapView } from "../coin-collection-view/UsMapView.js";
// import { EventRegister } from "../EventRegister.js";

export class USMapService {
  constructor(repo) {
    this.#repo = repo;
  }

  #repo;

  async getUSMapSvgText() {
    const text = await this.#repo.getUSMapSvgText();
    return UsMapView.from({ text });
  }
  putMapOnDisplay(text) {
    this.#repo.putMapOnDisplay(text);
  }
  getAndSerializePaths() {
    const paths = [...this.#repo.getAllPathsFromSVG("path")].map((p) => {
      p.id = "state";
      p.dataset.mouse = "out";
      return p;
    });
    this.#repo.entity.paths = paths;
    return paths;
  }
  getCarouselPathsByIndex(index) {
    const getPathAndSibling = (path) =>
      [path].map((p) => this.#repo.getPathAndPreviousSibling(p.dataset.name));
    const paths = this.#repo.entity.paths;
    const getNavPaths = (i) =>
      [i - 1 + paths.length, i, i + 1]
        .map((cal) => getPathAndSibling(paths[cal % paths.length]))
        .flat();
    this.#repo.navPaths = getNavPaths(index);
    const entity = UsMap.from({
      index,
      prev: this.#repo.navPaths[0],
      active: this.#repo.navPaths[1],
      next: this.#repo.navPaths[2],
    });
    return USMapDTO.from(entity.to());
  }
  getAllCoinsFromForeignObjects(foTag) {
    const fos = this.#repo.getAllForeignObjects(foTag);
    if (fos.length)
      return USMapDTO.from({
        coins: [...fos]
          .map((fo) => this.#repo.getCoinFromForeignObj(fo))
          .filter(Boolean),
      });
  }
  putStatesBackInMap() {
    if (!this.#repo.navPaths) return;
    const paths = this.#repo.navPaths;
    const entity = UsMap.from({
      prev: paths[0],
      active: paths[1],
      next: paths[2],
    }).to();
    Object.entries(entity.navPaths).forEach(([_, val]) =>
      this.#repo.putStatePathBack({
        path: val.path,
        sibling: val.sibling,
      }),
    );
  }
  async putCoinInForeignObj(coin) {
    const match = this.#repo.getForeignObjByName(coin.id);
    const path = this.#repo.getStatePathByName(coin.id);
    const { size, x, y } = await GeoUtility.getPositionForCoin(path);
    const fo = match
      ? match
      : this.#repo.getForeignObjectSVG({
          id: path.id,
          className: "fo-svg",
          data: { name: coin.id, mouse: "out" },
          width: size,
          height: size,
          x,
          y,
        });
    if (match) fo.dataset.mouse = "out";
    this.#repo.putCoinInForeignObject({ fo, c: coin });
    coin.dataset.location = fo.id;
    if (!match) this.#repo.putForeignObjAfterPath({ path, fo });
  }
  async putCoinsBackInMap(container) {
    const favorites = this.#repo.getCollectionFromContainer(container);
    const coins = this.#repo.getAllFavoriteCoins(favorites);
    if (coins)
      for (const coin of [...coins]) await this.putCoinInForeignObj(coin);
  }
  putPathLast(path) {
    this.#repo.pathSiblings = this.#repo.getNextAndPreviousSibling(path);
    this.#repo.putPathAndSiblingLast({
      path,
      siblings: this.#repo.pathSiblings,
    });
  }

  putPathBack(path) {
    // EventRegister.mutation = {
    //   node: this.#repo.entity.svg,
    //   fn: () => (path.dataset.mouse = "out"),
    // };
    if (!this.#repo.pathSiblings.previous)
      this.#repo.putPathAndSiblingFirst({
        path,
        siblings: this.#repo.pathSiblings,
      });
    else
      this.#repo.putPathAndSiblingBack({
        path,
        siblings: this.#repo.pathSiblings,
      });
    path.dataset.mouse = "out";
  }

  putFOLast(fo) {
    this.#repo.foSiblings = this.#repo.getNextAndPreviousSibling(fo);
    this.#repo.putForeignObjectLast(fo);
  }
  putFOBack(fo) {
    this.#repo.putForeignObjectBack({
      fo,
      siblings: this.#repo.foSiblings,
    });
    fo.dataset.mouse = "out";
  }
  putMapOnOffDisplay() {
    this.#repo.putMapOnOffDisplay();
  }
}
