import { USMapDTO } from "../coin-collection-dto/USMapDTO.js";
import { USMapEntity } from "../coin-collection-entity/USMapEntity.js";
import { USMapRepository } from "../coin-collection-repository/USMapRepository.js";
import { GeoUtility } from "../coin-collection-utility/GeoUtility.js";
import { EventRegister } from "../EventRegister.js";

export class USMapService extends USMapRepository {
  constructor() {
    super(USMapService.#getMap());
  }

  #init = (async () => {
    await this.#putMapOnDisplay();
    this.#getAndSerializePaths();
  })();

  static #getMap() {
    return USMapRepository.getMapLayout({
      id: "usmap",
      className: "usmap-layout",
    });
  }
  async #putMapOnDisplay() {
    const text = await this.getSvgUSMapText("/us.svg");
    const dto = USMapDTO.fromEntity({ html: text });
    const { node } = USMapEntity.fromDTO(dto);
    node.setAttribute("viewBox", "80 0 1000 589");
    USMapEntity.map = node;
    this.putMapInEntity(node);
    this.putMapOnDisplay();
  }

  #getAndSerializePaths() {
    const dto = USMapDTO.fromEntity({
      paths: [...this.getAllPathsFromSVG("path")].map(
        (p) => ((p.id = p.tagName.toLowerCase()), p),
      ),
    });
    USMapEntity.paths = dto.paths;
  }
  #getStatePathByName(body) {
    const dto = USMapDTO.fromEntity(body);
    const { name } = USMapEntity.fromDTO(dto);
    return this.getStatePathByName(name);
  }

  #getAllCoinsFromForeignObjects() {
    const dto = USMapDTO.fromEntity({ fos: this.getAllForeignObjects("#fo") });
    const { fos } = USMapEntity.fromDTO(dto);
    return {
      coins: [
        ...[fos].map((fo) => this.getCoinFromForeignObj({ fo, id: "#coin" })),
      ],
    };
  }
  #getCarouselPathsByIndex() {
    const getPathAndSibling = (p) =>
      [p].map((p) =>
        this.getPathAndPreviousSibling({
          name: p.dataset.name,
          map: USMapEntity.map,
        }),
      );
    const getNavPaths = (i) =>
      [i - 1 + paths.length, i, i + 1].map((cal) =>
        getPathAndSibling(paths[cal % paths.length]),
      );
    const paths = USMapEntity.paths;
    const { index } = USMapDTO.fromEntity({});
    const dto = USMapDTO.fromEntity({ navPaths: getNavPaths(index) });
    return USMapEntity.fromDTO(dto); //{ prev, active, next }
  }

  #putStatesBackInMap() {
    const navPaths = USMapDTO.navPaths;
    const dto = USMapDTO.fromEntity({ navPaths: () => navPaths });
    const { prev, active, next } = USMapEntity.fromDTO(dto);
    Object.entries({ prev, active, next }).forEach(([key, val]) =>
      this.putStatePathBack({
        path: val.path,
        sibling: val.sibling,
        map: USMapEntity.map,
      }),
    );
  }

  #putCoinInForeignObj(body) {
    const dto = USMapDTO.fromEntity(body);
    const { name, coin } = USMapEntity.fromDTO(dto);
    const match = this.getForeignObjByName(name);
    const path = this.getStatePathByName(name);
    const { width, height, x, y } = USMapEntity.fromDTO(
      USMapDTO.fromEntity(GeoUtility.getPositionForCoin(path)),
    );
    const map = {
      [!!match]: () => match,
      [!match]: () =>
        this.getForeignObjectSVG({
          id: "fo",
          className: "fo-svg",
          data: { name },
          width,
          height,
          x,
          y,
        }),
    };
    const fo = map[true]();
    this.putCoinInForeignObject({ fo, c: coin });
    if (!match) this.putForeignObjAfterPath({ fo, path });
  }
  #putCoinsBackInMap(body) {
    const dto = USMapDTO.fromEntity(body);
    const { favorites } = USMapEntity.fromDTO(dto);
    const coins = this.getAllfavoriteCoins({ favorites, id: "#coin" });
    coins.forEach((coin) => this.#putCoinInForeignObj({ entity: { coin } }));
  }
  #putPathLast(body) {
    const getNextAndPrev = (p) => [...this.getNextAndPreviousSibling(p)];
    const dto = USMapDTO.fromEntity({ siblings: getNextAndPrev(body.target) });
    const { path, siblings } = USMapEntity.fromDTO(dto);
    this.putPathAndSiblingLast({ path, siblings, map: USMapEntity.map });
    path.dataset.mouse = "out";
  }
  #putPathBack(body) {
    const dto = USMapDTO.fromEntity(body);
    const { path, siblings } = USMapEntity.fromDTO(dto);
    if (!siblings.previous)
      this.putPathAndSiblingsFirst({
        path,
        siblings,
        map: USMapEntity.map,
      });
    else this.putPathAndSiblingsBack({ path, siblings });
    path.dataset.mouse = "over";
  }
  #putFOLast(body) {
    const dto = USMapDTO.fromEntity({
      siblings: [...this.getNextAndPreviousSibling(body.target)],
    });
    const { fo, siblings } = USMapEntity.fromDTO(dto);
    this.putForeignObjectLast({ fo, map: USMapEntity.map });
    fo.dataset.mouse = "out";
  }
  #putFOBack(body) {
    EventRegister.transition = () => {
      const dto = USMapDTO.fromEntity(body);
      const { fo, siblings } = USMapEntity.fromDTO(dto);
      this.putForeignObjectBack({ fo, siblings });
      fo.dataset.mouse = "over";
    };
  }
}
