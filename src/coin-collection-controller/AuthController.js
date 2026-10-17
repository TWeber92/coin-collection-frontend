import { AppController } from "./AppController.js";

export class AuthController extends AppController {
  #authService;
  constructor(service) {
    super();
    this.#authService = service;
  }

  async logout(req, res) {
    return super.POST(req, res, async () => await this.#authService.logout());
  }

  async getMe(req, res) {
    return super.GET(req, res, async () => await this.#authService.getMe());
  }
  async getPin(req, res) {
    return super.GET(
      req,
      res,
      async () => await this.#authService.getPin(req.body.email),
    );
  }

  getPinInputValidation(req, res) {
    return super.GET(req, res, () =>
      this.#authService.getPinInputValidation(req.body.input, req.body.button),
    );
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
  async putNewCollectionInUser(req, res) {
    super.PUT(
      req,
      res,
      async () => await this.#authService.putNewCollectionInUser(req.body.user),
    );
  }
  async postPasswordResetForm(req, res) {
    return super.PUT(
      req,
      res,
      async () =>
        await this.#authService.postPasswordResetForm(
          req.body.email,
          req.body.pin,
          req.body.password,
        ),
    );
  }
}
