import { CoinDTO } from "../coin-collection-dto/CoinDTO";
import { CoinEntity } from "../coin-collection-entity/CoinEntity";
import { CoinRepository } from "../coin-collection-repository/CoinRepository";

export class CoinService extends CoinRepository {
  constructor() {
    super(this.#getCoin());
  }

  #getCoin() {
    const entity = CoinRepository.getCoinElement({
      id: "coin",
      className: "coin-entity",
      hidden: true,
    });
    CoinEntity.coin = entity;
    return entity;
  }

  #getUpdatedCoinState() {
    return CoinEntity.fromDTO({}).coin;
  }

  #updateCoinEntityState(body) {
    const dto = CoinDTO.fromEntity(body);
    const coin = this.getCoinContainer(dto.coin);
    this.putCoinInEntity(coin);
  }

  async #updateCoinEntity(body) {
    const coinDto = await this.getCoinByStateName(body.name);
    const dto = CoinDTO.fromDTO(coinDto);
    const entity = CoinEntity.fromDTO(dto);
    this.putCoinInEntity(entity.node);
    return entity;
  }
}
