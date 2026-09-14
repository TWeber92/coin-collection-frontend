import { BrowserClient } from "./BrowserClient.js";

export class BrowserRepository extends BrowserClient {
  constructor() {
    super();
  }
  getLocalStorageByKey(key) {
    return super.LOCAL.GET(key);
  }
  putNewItemInLocalByKey(key, value) {
    const local = super.LOCAL.GET(key);
    const updated = [...local, value];
    super.LOCAL.PUT(key, updated);
  }
  deleteItemInLocalByKey(key, value) {
    const local = super.LOCAL.GET(key);
    const updated = local.filter((item) => item !== value);
    super.LOCAL.PUT(key, updated);
  }

  getSessionStorageByKey(key) {
    return super.SESSION.GET(key);
  }
  putNewItemInSessionByKey(key, name, value) {
    const session = super.SESSION.GET(key);
    session[name] = value;
    super.SESSION.PUT(key, session);
  }
}
