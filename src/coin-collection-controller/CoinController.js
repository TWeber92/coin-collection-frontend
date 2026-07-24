export class CoinController extends AppController {
  #coinService;

  constructor(service) {
    super();
    this.#coinService = service;
  }
  getCoinState(req, res) {
    return super.GET(req, res, () => {
      const coin = this.#coinService.getCoinState(req.body);
      return { coin };
    });
  }
  updateCoinState(req, res) {
    return super.PUT(req, res, () => {
      this.#coinService.updateCoinState(req.body);
      return { coin };
    });
  }
  updateCoinElement(req, res) {
    return super.PUT(req, res, () => {
      const coin = this.#coinService.updateCoinElement(req.body);
      return { coin };
    });
  }
}
