import { UserDTO } from "../coin-collection-dto/UserDTO.js";
import { User } from "../coin-collection-entity/User.js";
import { GetMeNotice, LogoutNotice } from "../coin-collection-exception/CoinCollectionError.js";
import { UserValidator } from "../coin-collection-validation/UserValidator.js";
import { ModalView } from "../coin-collection-view/ModalView.js";

export class AuthService {
  constructor(repo) {
    this.#repo = repo;
  }

  #repo;

  async getMe() {
    const user = await this.#repo.getMe();
    const message = user.message;
    if (message) user.message = new GetMeNotice(message);
    const entity = User.from(user);
    return UserDTO.from(entity.to());
  }
  async logout() {
    const result = await this.#repo.postLogout();
    return new LogoutNotice(result.message)
  }

  getEmailInputValidation(input, button) {
    this.getInputValidation(input, button);
  }
  getPasswordInputValidation(input, button) {
    this.getInputValidation(input, button);
  }
  getPasswordMatchValidation(input, button) {
    this.getInputValidation(input, button);
  }

  getInputValidation(input, button) {
    const setSpan = (s, n) => this.#repo.putSpanContextOnDisplay({ s, n });
    const setButton = (button, inputs) =>
      (button.disabled = !inputs.every((i) => i.checkValidity()));
    const inputs = [...this.#repo.getInputsFromForm(input)];
    const spanSibling = this.#repo.getSpanSibling(input);
    input.disable = () => setButton(button, inputs);
    const confirm = UserValidator.validateUserInput(input);
    const html = ModalView.from({}).valid;
    const valid = this.#repo.getValidSpanWithHtml(html);
    setSpan(spanSibling, valid[0]);
    if (confirm?.interacted) {
      UserValidator.validateUserInput(confirm);
      setSpan(this.#repo.getSpanSibling(confirm), valid[0]);
    }
    setButton(button, inputs);
  }

  putUserCollection(user) {
    const entity = User.from(user);
    this.#repo.putUserCollection(entity.to());
  }
}
