import { CoinDTO } from "../coin-collection-dto/CoinDTO.js";
import { CoinEntity } from "../coin-collection-entity/CoinEntity.js";
import { CoinRepository } from "../coin-collection-repository/CoinRepository.js";

export class CoinService extends CoinRepository {
  constructor() {
    super(CoinService.#getCoin());
  }

  static #getCoin() {
    const entity = CoinRepository.getCoinElement({
      id: "coin",
      className: "coin-entity",
      hidden: true,
      data: { location: "modal" },
    });
    CoinEntity.coin = entity;
    return entity;
  }

  #getUpdatedCoinState(body) {
    const dto = CoinDTO.fromEntity(body);
    const entity = CoinEntity.fromDTO(dto);
    const clone = entity.coin.cloneNode(true);
    return { ...entity, coin: dto.action === "add" ? clone : dto.coin };
  }

  #updateCoinEntityState(body) {
    const dto = CoinDTO.fromEntity(body);
    const entity = CoinEntity.fromDTO(dto);
    this.putCoinInEntity(entity.node);
  }

  async #updateCoinEntity(body) {
    const coinDto = await this.getCoinByStateName(body.name);
    const dto = CoinDTO.fromDTO(coinDto);
    const entity = CoinEntity.fromDTO(dto);
    this.putCoinInEntity(entity.node);
    return entity;
  }
}
