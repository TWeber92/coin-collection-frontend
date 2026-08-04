export class HeaderController extends AppController {
  #headerService;

  constructor(service) {
    super();
    this.#headerService = service;
  }
  #putContextInHeader(req, res) {
    super.PUT(req, res, () => this.#headerService.putContextInHeader());
  }
  #updateMenuCounters(req, res) {
    super.PUT(req, res, () => this.#headerService.updateMenuCounters(req.body));
  }
  #updateMenuView(req, res) {
    super.PUT(req, res, () => this.#headerService.updateMenu());
  }
}
