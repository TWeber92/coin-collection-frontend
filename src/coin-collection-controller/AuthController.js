import { AppController } from "./AppController.js";

export class AuthController extends AppController {
  #authService;
  constructor(service) {
    super();
    this.#authService = service;
  }
  
  async logout(req, res) {
    return super.POST(req, res, () => this.#authService.logout())
  }

  getMe(req, res) {
    return super.GET(req, res, () => this.#authService.getMe());
  }

  getEmailInputValidation(req, res) {
    return super.GET(req, res, () =>
      this.#authService.getEmailInputValidation(
        req.body.input,
        req.body.button,
      ),
    );
  }
  getPasswordInputValidation(req, res) {
    return super.GET(req, res, () =>
      this.#authService.getPasswordInputValidation(
        req.body.input,
        req.body.button,
      ),
    );
  }
  getPasswordMatchValidation(req, res) {
    return super.GET(req, res, () =>
      this.#authService.getPasswordMatchValidation(
        req.body.input,
        req.body.button,
      ),
    );
  }
  putUserCollection(req, res) {
    super.PUT(req, res, () =>
      this.#authService.putUserCollection(req.body.user),
    );
  }
}
