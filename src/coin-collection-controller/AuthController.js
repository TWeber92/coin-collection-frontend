import { AppController } from "./AppController.js";

export class AuthController extends AppController {
  #authService;
  constructor(service) {
    super();
    this.#authService = service;
  }

  getEmailInputValidation(req, res) {
    return super.GET(req, res, () =>
      this.#authService.getEmailInputValidation(req.body),
    );
  }
  getPasswordInputValidation(req, res) {
    return super.GET(req, res, () =>
      this.#authService.getPasswordInputValidation(req.body),
    );
  }
  getPasswordMatchValidation(req, res) {
    return super.GET(req, res, () =>
      this.#authService.getPasswordMatchValidation(req.body),
    );
  }
}
