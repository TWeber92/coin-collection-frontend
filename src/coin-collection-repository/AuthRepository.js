import { DocumentClient } from "./DocumentClient.js";

export class AuthRepository extends DocumentClient {
  constructor() {
    super();
  }

  getInputsFromForm(value) {
    return super.GET(value, (i) => i.form.querySelectorAll("input"));
  }
  getSpanSibling(value) {
    return super.GET(value, (i) => i.nextElementSibling);
  }
  putSpanContextOnDisplay(value) {
    super.PUT(value, (v) => (v.s.textContent = v.n.textContent));
    value.s.hidden = false;
  }
}
