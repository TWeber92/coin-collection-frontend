import { AppController } from "./AppController.js";

export class CoinController extends AppController {
  #coinService;

  constructor(service) {
    super();
    this.#coinService = service;
  }
  getUpdatedCoinState(req, res) {
    return super.GET(req, res, () =>
      this.#coinService.getUpdatedCoinState(req.body),
    );
  }
  updateCoinEntityState(req, res) {
    super.PUT(req, res, () =>
      this.#coinService.updateCoinEntityState(req.body),
    );
  }
  async updateCoinEntity(req, res) {
    return super.PUT(req, res, async () => {
      const { coin, year } = await this.#coinService.updateCoinEntity(req.body);
      return { coin, year };
    });
  }
}
