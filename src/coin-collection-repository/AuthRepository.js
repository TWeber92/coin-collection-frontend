import { HtmlStore } from "../HtmlStore.js";
import { DocumentClient } from "./DocumentClient.js";

export class AuthRepository extends DocumentClient {
  constructor(api, local) {
    super();
    this.#api = api;
    this.#local = local;
  }
  #api;
  #local;

  #user = {
    email: null,
    collection: { favorites: [], archive: [] },
  };
  get user() {
    return this.#user;
  }
  async postLogin(email, password) {
    // return await this.#local.POST("/api/login", { email, password });
    return await this.#api.POST("/api/login", { email, password });
  }

  async postSignup(email, password, collection) {
    // return await this.#local.POST("/api/signup", { email, password, collection });
    return await this.#api.POST("/api/signup", { email, password, collection });
  }

  async putUserCollection(entity) {
    // await this.#local.PUT("/api/user/collection", {
    //   collection: entity.collection,
    // });
    await this.#api.PUT("/api/user/collection", {
      collection: entity.collection,
    });
  }
  async putUserPassword({ email, pin, password }) {
    // return await this.#local.PUT("/api/password", {
    //   email,
    //   pin,
    //   newPassword: password,
    // });
    return await this.#api.PUT("/api/password", {
      email,
      pin,
      newPassword: password,
    });
  }
  async getPin(email) {
    // return await this.#local.POST("/api/pin", { email });
    return await this.#api.POST("/api/pin", { email });
  }
  async getMe() {
    // return await this.#local.GET("/api/me");
    return await this.#api.GET("/api/me");
  }
  async postLogout() {
    // return await this.#local.POST("/api/logout");
    return await this.#api.POST("/api/logout");
  }

  getValidSpanWithHtml(html) {
    return super.GET(html, (t) => HtmlStore.from(t).nodes);
  }
  getInputsFromForm(input) {
    return super.GET(input, (i) => i.form.querySelectorAll(i.tagName));
  }
  getSpanSibling(input) {
    return super.GET(input, (i) => i.nextSibling);
  }
  putSpanContextOnDisplay(context) {
    super.PUT(context, ({ s, n }) => {
      s.textContent = n.textContent;
      s.hidden = false;
    });
  }
}
