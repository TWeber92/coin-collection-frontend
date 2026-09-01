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
    const coin = dto.clone ? this.#repo.getCloneCoinEntity() : dto.coin;
    return CoinEntity.fromDTO({ ...dto, coin });
  }

  updateCoinEntityState(body) {
    CoinDTO.fromEntity(body);
  }

  async updateCoinEntity(body) {
    const data = await this.#repo.getCoinByStateName(body.name);
    const dto = CoinDTO.fromDTO(data);
    const entity = CoinEntity.fromDTO(dto);
    return { ...entity, coin: this.#repo.putCoinInEntity(entity.node[0]) };
  }
}
