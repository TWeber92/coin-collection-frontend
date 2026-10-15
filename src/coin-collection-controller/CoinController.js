import { AppController } from "./AppController.js";

export class CoinController extends AppController {
  #coinService;

  constructor(service) {
    super();
    this.#coinService = service;
  }
  getSelectedCoinEntity(req, res) {
    return super.GET(req, res, () =>
      this.#coinService.getSelectedCoinEntity(req.body.clone),
    );
  }
  putSelectedCoinInEntity(req, res) {
    return super.PUT(req, res, () =>
      this.#coinService.putSelectedCoinInEntity(req.body.coin),
    );
  }
  async putNewCoinInEntity(req, res) {
    return super.PUT(
      req,
      res,
      async () => await this.#coinService.putNewCoinInEntity(req.body.name),
    );
  }
  deletePartOfCoinId(req, res) {
    super.DELETE(req, res, () =>
      this.#coinService.deletePartOfCoinId(req.body.coin.entity),
    );
  }
}
