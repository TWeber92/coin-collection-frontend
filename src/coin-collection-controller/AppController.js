import { Logger } from "../coin-collection-utility/Logger.js";

export class AppController {
  async APP(req, res, handler) {
    try {
      const result = await handler();
      const data = result && result.to ? result.to() : null;
      const message = data ? data.message : null;
      if (message) this.#handleError({ status: data.status, message }, res);
      if (res) res.obj(result);
      return;
    } catch (err) {
      return this.#handleError(err, res);
    }
  }
  async GET(req, res, handler) {
    return await this.APP(req, res, handler);
  }
  async POST(req, res, handler) {
    return await this.APP(req, res, handler);
  }
  async PUT(req, res, handler) {
    return await this.APP(req, res, handler);
  }
  async DELETE(req, res, handler) {
    return await this.APP(req, res, handler);
  }
  #handleError(error, res) {
    const payload = error.toJSON ? error.toJSON() : error;
    const severity = payload.status >= 500 ? "ERROR" : "WARN";
    const entry = Logger.log(payload.message);

    const map = {
      ValidationError: () => res?.obj({ message: error }),
      AuthenticationError: () => res?.obj({ message: error }),
      AuthorizationError: () => res?.obj({ message: error }),
    };
    if (map[payload.name]) map[payload.name]();
    else Logger.methods[severity](entry);
    return;
  }
}
