import { CoinDTO } from "../coin-collection-dto/CoinDTO.js";
import { CoinEntity } from "../coin-collection-entity/CoinEntity.js";
import { CoinRepository } from "../coin-collection-repository/CoinRepository.js";

export class CoinService {
  constructor() {
    this.#repo = new CoinRepository();
  }

  #repo;

  getUpdatedCoinState(body) {
    const dto = CoinDTO.fromEntity(body);
    const coin = dto.clone
      ? this.#repo.getCloneCoinEntityRemoveTooltip(dto.tooltip)
      : dto.coin;
    return CoinEntity.fromDTO({ ...dto, coin });
  }

  updateCoinEntityState(body) {
    CoinDTO.fromEntity({
      ...body,
      coin: this.#repo.getCurrentEntityParent(body.coin),
    });
  }

  async updateCoinEntity(body) {
    console.log("creating coin");
    const coin = this.#repo.getCacheCoinFromSession(body.name);
    const dto = coin
      ? CoinDTO.fromEntity({ ...body, ...coin })
      : CoinDTO.fromAPI({
          ...(await this.#repo.getCoinByStateName(body.name)),
        });
    this.#repo.putCacheCoinInSession({ k: dto.name, c: dto.cache });
    const entity = CoinEntity.fromDTO(dto);
    return {
      ...entity,
      coin: this.#repo.putCoinInEntity({ c: entity.node[0], n: entity.name }),
    };
  }
}
