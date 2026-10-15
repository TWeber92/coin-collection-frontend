import { HtmlStore } from "../HtmlStore.js";
import { APIClient } from "./APIClient.js";
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
  // get user() {
  //   return this.#user;
  // }
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

  // async getMe() {
  //   console.log(this.#mockUser);
  //   return this.#mockUser;
  // }
  // async getMe() {
  //   console.log(this.#user);
  //   return this.#user;
  // }
  // async getMe() {
  //   const result = await this.#api.GET("/api/me");
  //   if (result.message) {
  //     this.#user.message = result.message;
  //     return this.#user;
  //   } else return result;
  // }
  async getMe() {
    const result = await this.#local.GET("/api/me");
    console.log(result);
    if (result.message) {
      this.#user.message = result.message;
      return this.#user;
    } else return result;
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
