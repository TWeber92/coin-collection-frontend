import { USMapDTO } from "../coin-collection-dto/USMapDTO.js";
import { USMapEntity } from "../coin-collection-entity/USMapEntity.js";
import { USMapRepository } from "../coin-collection-repository/USMapRepository.js";
import { GeoUtility } from "../coin-collection-utility/GeoUtility.js";
import { EventRegister } from "../EventRegister.js";

export class USMapService {
  constructor(resolve) {
    this.#repo = new USMapRepository();
    this.#init(resolve);
  }

  #repo;

  async #init(resolve) {
    await this.#putMapOnDisplay(resolve);
  }

  async #putMapOnDisplay(resolve) {
    const text = await this.#repo
      .getSvgUSMapText("/us.svg")
      .then((t) => t.replace(/<path[^>]*\bid="DC"[^>]*\/>/gi, ""));
    const dto = USMapDTO.fromEntity({ html: text });
    const { node } = USMapEntity.fromDTO(dto);
    node.setAttribute("viewBox", "80 0 1000 589");
    USMapEntity.map = node;
    this.#repo.putMapInEntity(node);
    this.#repo.putMapOnOffDisplay();
    this.#getAndSerializePaths();
    resolve();
  }

  #getAndSerializePaths() {
    const dto = USMapDTO.fromEntity({
      paths: [...this.#repo.getAllPathsFromSVG("path")].map((p) => {
        p.id = "state";
        p.dataset.mouse = "out";
        return p;
      }),
    });
    USMapEntity.paths = dto.paths;
  }

  getAllCoinsFromForeignObjects(body) {
    const dto = USMapDTO.fromEntity(body);
    const { fos } = USMapEntity.fromDTO({
      ...dto,
      fos: this.#repo.getAllForeignObjects(dto.foTag),
    });
    if (fos.length)
      return [...fos]
        .map((fo) => this.#repo.getCoinFromForeignObj(fo))
        .filter(Boolean);
  }
  getCarouselPathsByIndex() {
    const getPathAndSibling = (paths) =>
      [paths].map((p) =>
        this.#repo.getPathAndPreviousSibling({
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
      this.#repo.putStatePathBack({
        path: val.path,
        sibling: val.sibling,
      }),
    );
  }

  async putCoinInForeignObj(body) {
    const dto = USMapDTO.fromEntity(body);
    const match = this.#repo.getForeignObjByName(dto.name);
    const path = this.#repo.getStatePathByName(dto.name);
    const { width, height, x, y, coin, name } = USMapEntity.fromDTO({
      ...dto,
      ...(await GeoUtility.getPositionForCoin(path)),
    });
    const map = {
      [!!match]: () => match,
      [!match]: () =>
        this.#repo.getForeignObjectSVG({
          id: path.id,
          className: "fo-svg",
          data: { name, mouse: "out" },
          width,
          height,
          x,
          y,
        }),
    };
    const fo = map[true]();
    this.#repo.putCoinInForeignObject({ fo, c: coin });
    coin.dataset.location = fo.id;
    if (!match) this.#repo.putForeignObjAfterPath({ fo, path });
  }
  async putCoinsBackInMap(body) {
    const dto = USMapDTO.fromEntity(body);
    const entity = USMapEntity.fromDTO({
      ...dto,
      favorites: this.#repo.getCollectionContainer(dto.favorites),
    });
    const coins = this.#repo.getAllFavoriteCoins(entity.favorites);
    if (coins)
      for (const coin of [...coins]) await this.putCoinInForeignObj({ coin });
  }

  putPathLast(body) {
    const getNextAndPrev = (p) => this.#repo.getNextAndPreviousSibling(p);
    const dto = USMapDTO.fromEntity({
      ...body,
      pathSiblings: getNextAndPrev(body.path),
    });
    const { path, pathSiblings } = USMapEntity.fromDTO(dto);
    this.#repo.putPathAndSiblingLast({
      path,
      siblings: pathSiblings,
      map: USMapEntity.map,
    });
  }

  putPathBack(body) {
    const dto = USMapDTO.fromEntity(body);
    const { path, pathSiblings } = USMapEntity.fromDTO(dto);
    EventRegister.mutation = {
      node: USMapEntity.map,
      fn: () => (path.dataset.mouse = "out"),
    };
    if (!pathSiblings.previous)
      this.#repo.putPathAndSiblingFirst({
        path,
        siblings: pathSiblings,
        map: USMapEntity.map,
      });
    else this.#repo.putPathAndSiblingBack({ path, siblings: pathSiblings });
  }
  putFOLast(body) {
    EventRegister.transition = () => {
      const dto = USMapDTO.fromEntity({
        ...body,
        foSiblings: this.#repo.getNextAndPreviousSibling(body.fo),
      });
      const { fo } = USMapEntity.fromDTO(dto);
      this.#repo.putForeignObjectLast({ fo, map: USMapEntity.map });
    };
  }
  putFOBack(body) {
    EventRegister.transition = () => {
      const dto = USMapDTO.fromEntity(body);
      const { fo, foSiblings } = USMapEntity.fromDTO(dto);
      EventRegister.mutation = {
        node: USMapEntity.map,
        fn: () => (fo.dataset.mouse = "out"),
      };
      this.#repo.putForeignObjectBack({ fo, siblings: foSiblings });
    };
  }
  putMapOnOffDisplay() {
    this.#repo.putMapOnOffDisplay();
  }
}
