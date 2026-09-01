import { USMapDTO } from "../coin-collection-dto/USMapDTO.js";
import { USMapEntity } from "../coin-collection-entity/USMapEntity.js";
import { USMapRepository } from "../coin-collection-repository/USMapRepository.js";
import { GeoUtility } from "../coin-collection-utility/GeoUtility.js";
import { EventRegister } from "../EventRegister.js";

export class USMapService extends USMapRepository {
  constructor(resolve) {
    super(USMapService.#getMap());
    this.#init(resolve);
  }

  async #init(resolve) {
    await this.#putMapOnDisplay(resolve);
  }

  static #getMap() {
    return USMapRepository.getMapLayout({
      id: "usmap",
      className: "usmap-layout",
    });
  }
  async #putMapOnDisplay(resolve) {
    const text = await this.getSvgUSMapText("/us.svg").then((t) =>
      t.replace(/<path[^>]*\bid="DC"[^>]*\/>/gi, ""),
    );
    const dto = USMapDTO.fromEntity({ html: text });
    const { node } = USMapEntity.fromDTO(dto);
    node.setAttribute("viewBox", "80 0 1000 589");
    USMapEntity.map = node;
    this.putMapInEntity(node);
    this.putMapOnOffDisplay();
    this.#getAndSerializePaths();
    resolve();
  }

  #getAndSerializePaths() {
    const dto = USMapDTO.fromEntity({
      paths: [...this.getAllPathsFromSVG("path")].map(
        (p) => ((p.id = "state"), p),
      ),
    });
    USMapEntity.paths = dto.paths;
  }
  getStatePathByName(body) {
    const dto = USMapDTO.fromEntity(body);
    const { name } = USMapEntity.fromDTO(dto);
    return super.getStatePathByName(name);
  }

  getAllCoinsFromForeignObjects() {
    const dto = USMapDTO.fromEntity({ fos: this.getAllForeignObjects("#fo") });
    const { fos } = USMapEntity.fromDTO(dto);
    return {
      coins: [
        ...[fos].map((fo) => this.getCoinFromForeignObj({ fo, id: "#coin" })),
      ],
    };
  }
  getCarouselPathsByIndex() {
    const getPathAndSibling = (paths) =>
      [paths].map((p) =>
        this.getPathAndPreviousSibling({
          p,
          name: p.dataset.name,
          map: USMapEntity.map,
        }),
      );
    const paths = USMapEntity.paths;
    const getNavPaths = (i) =>
      [i - 1 + paths.length, i, i + 1]
        .map((cal) => getPathAndSibling(paths[cal % paths.length]))
        .flat();
    const { index } = USMapDTO.fromEntity({});
    const dto = USMapDTO.fromEntity({ navPaths: getNavPaths(index) });
    return USMapEntity.fromDTO(dto); //{ prev, active, next }
  }

  putStatesBackInMap() {
    const dto = USMapDTO.fromEntity({});
    if (!dto.navPaths) return;
    const { prev, active, next } = USMapEntity.fromDTO(dto);
    Object.entries({ prev, active, next }).forEach(([_, val]) =>
      this.putStatePathBack({
        path: val.path,
        sibling: val.sibling,
      }),
    );
  }

  putCoinInForeignObj(body) {
    const dto = USMapDTO.fromEntity(body);
    const { name, coin } = USMapEntity.fromDTO(dto);
    const match = this.getForeignObjByName(name);
    const path = super.getStatePathByName(name);
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
  putCoinsBackInMap(body) {
    const dto = USMapDTO.fromEntity(body);
    const entity = USMapEntity.fromDTO(dto);
    const coins = this.getAllfavoriteCoins({ f: entity.coins, id: "#coin" });
    coins.forEach((coin) => this.putCoinInForeignObj({ coin }));
  }
  putPathLast(body) {
    const getNextAndPrev = (p) => [...this.getNextAndPreviousSibling(p)];
    const dto = USMapDTO.fromEntity({ siblings: getNextAndPrev(body.target) });
    const { path, siblings } = USMapEntity.fromDTO(dto);
    this.putPathAndSiblingLast({ path, siblings, map: USMapEntity.map });
    path.dataset.mouse = "out";
  }
  putPathBack(body) {
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
  putFOLast(body) {
    const dto = USMapDTO.fromEntity({
      siblings: [...this.getNextAndPreviousSibling(body.target)],
    });
    const { fo, siblings } = USMapEntity.fromDTO(dto);
    this.putForeignObjectLast({ fo, map: USMapEntity.map });
    fo.dataset.mouse = "out";
  }
  putFOBack(body) {
    EventRegister.transition = () => {
      const dto = USMapDTO.fromEntity(body);
      const { fo, siblings } = USMapEntity.fromDTO(dto);
      this.putForeignObjectBack({ fo, siblings });
      fo.dataset.mouse = "over";
    };
  }
  putMapOnOffDisplay(body) {
    super.putMapOnOffDisplay();
  }
}
