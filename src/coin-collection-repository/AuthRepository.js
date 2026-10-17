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

  #mockUser = {
    id: "mock-uuid",
    email: "tadweber92@gmail.com",
    createdAt: "2026-08-15T12:00:00.000Z",
    collection: {
      favorites: ["California", "Texas"], // California new, Texas dup
      archive: ["Nevada", "Maine"], // Nevada new, Maine dup
    },
  };
  #user = {
    email: null,
    collection: { favorites: [], archive: [] },
  };
  get user() {
    return this.#user;
  }
  async postLogin(email, password) {
    return await this.#api.POST("/api/login", { email, password });
  }

  async postSignup(email, password, collection) {
    return await this.#api.POST("/api/signup", { email, password, collection });
  }

  // async putUserCollection(entity) {
  //   console.log({ collection: entity.collection });
  //   this.#mockUser.collection = entity.collection;
  //   console.log(this.#mockUser);
  // }
  // async putUserCollection(entity) {
  //   console.log({ collection: entity.collection });
  //   await this.#api.PUT("/api/user/collection", {
  //     collection: entity.collection,
  //   });
  // }
  async putUserCollection(entity) {
    console.log({ collection: entity.collection });
    await this.#local.PUT("/api/user/collection", {
      collection: entity.collection,
    });
  }
  // async putUserPassword({ email, pin, password }) {
  //   return await this.#api.PUT("/api/password", { email, pin, password });
  // }
  async putUserPassword({ email, pin, password }) {
    return await this.#local.PUT("/api/password", {
      email,
      pin,
      newPassword: password,
    });
  }
  // async putUserPassword({ email, pin, password }) {
  //   return { message: "Password updated successfully." }
  // }
  // async getPin(email) {
  //   return await this.#api.POST("/api/pin", { email });
  // }
  async getPin(email) {
    return await this.#local.POST("/api/pin", { email });
  }
  // async getPin(email) {
  //   return { message: "If that email is registered, a PIN has been sent." };
  // }

  // async getMe() {
  //   console.log(this.#mockUser);
  //   return this.#mockUser;
  // }
  // async getMe() {
  //   console.log(this.#user);
  //   return this.#user;
  // }
  // async getMe() {
  //   return await this.#api.GET("/api/me");
  // }
  async getMe() {
    return await this.#local.GET("/api/me");
  }
  async postLogout() {
    return await this.#local.POST("/api/logout");
  }
  // async postLogout() {
  //   return await this.#api.POST("/api/logout");
  // }

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
