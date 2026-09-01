import { BrowserClient } from "./BrowserClient.js";

export class BrowserRepository extends BrowserClient {
  constructor() {
    super();
  }
  postLocalStorageByKey(value) {
    super.LOCAL.POST(value);
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
}
