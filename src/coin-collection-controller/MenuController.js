export class MenuController extends AppController {
  #menuService;

  constructor(service) {
    super();
    this.#menuService = service;
  }
  updateMenuCounters(req, res) {
    super.PUT(req, res, () => this.#menuService.updateMenuCounters(req.body));
  }
  updateMenu(req, res) {
    super.PUT(req, res, () => this.#menuService.updateMenu());
  }
}
