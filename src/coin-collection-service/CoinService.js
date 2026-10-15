import { CoinDTO } from "../coin-collection-dto/CoinDTO.js";
import { Coin } from "../coin-collection-entity/Coin.js";
import { CoinView } from "../coin-collection-view/CoinView.js";

export class CoinService {
  constructor(repo) {
    this.#repo = repo;
  }

  #repo;

  getSelectedCoinEntity(clone) {
    const coin = clone
      ? this.#repo.entity.selected.cloneNode(true)
      : this.#repo.entity.selected;
    const entity = Coin.from({ entity: coin });
    return CoinDTO.from(entity.to());
  }
  putSelectedCoinInEntity(coin) {
    this.#repo.putSelectedCoinInEntity(coin);
    const entity = Coin.from({ entity: this.#repo.entity.selected });
    return CoinDTO.from(entity.to());
  }

  async putNewCoinInEntity(name) {
    const cache = this.#repo.getCacheCoinFromSession(name);
    const coinObj = cache ? cache : await this.#repo.getCoinByStateName(name);
    const html = CoinView.from(coinObj).coin;
    const coin = this.#repo.getCoinWithHtml(html);
    this.#repo.putCacheCoinInSession({ k: name, c: coinObj });
    this.#repo.entity.coin.id = name;
    const entity = Coin.from({
      ...coinObj,
      entity: this.#repo.putCoinInEntity(coin[0]),
    });
    return CoinDTO.from(entity.to());
  }
  deletePartOfCoinId(entity) {
    this.#repo.deletePartOfCoinId(entity);
  }
}
