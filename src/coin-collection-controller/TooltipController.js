import { AppController } from "./AppController.js";

export class TooltipController extends AppController {
  #tooltipService;

  constructor(service) {
    super();
    this.#tooltipService = service;
  }
  postAddTooltip(req, res) {
    super.POST(req, res, () => this.#tooltipService.postAddTooltip(req.body));
  }
  postArchiveTooltip(req, res) {
    super.POST(req, res, () =>
      this.#tooltipService.postArchiveTooltip(req.body),
    );
  }
  postRestoreOrDeleteTooltip(req, res) {
    super.POST(req, res, () =>
      this.#tooltipService.postRestoreOrDeleteTooltip(req.body),
    );
  }
  deleteTooltip(req, res) {
    super.DELETE(req, res, () => this.#tooltipService.deleteTooltip(req.body));
  }
}
