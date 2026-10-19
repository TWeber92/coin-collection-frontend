import { UserDTO } from "../coin-collection-dto/UserDTO.js";
import { User } from "../coin-collection-entity/User.js";
import {
  GetMeNotice,
  LoginNotice,
  LogoutNotice,
  PasswordResetNotice,
} from "../coin-collection-exception/CoinCollectionError.js";
import { UserValidator } from "../coin-collection-validation/UserValidator.js";
import { ModalView } from "../coin-collection-view/ModalView.js";

export class AuthService {
  constructor(repo) {
    this.#repo = repo;
  }

  #repo;

  async getMe() {
    const result = await this.#repo.getMe();
    const user = result.message ? this.#repo.user : result;
    if (result.message) user.message = new GetMeNotice(result.message);
    const entity = User.from(user);
    return UserDTO.from(entity.to());
  }
  getPin(email) {
    return this.#repo.getPin(email);
  }
  async logout() {
    const result = await this.#repo.postLogout();
    return new LogoutNotice(result.message);
  }

  getEmailInputValidation(input, button) {
    this.#getInputValidation(input, button);
  }
  getPasswordInputValidation(input, button) {
    this.#getInputValidation(input, button);
  }
  getPasswordMatchValidation(input, button) {
    this.#getInputValidation(input, button);
  }
  getPinInputValidation(input, button) {
    this.#getInputValidation(input, button);
  }

  #getInputValidation(input, button) {
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
  async postPasswordResetForm(email, pin, password) {
    const result = await this.#repo.putUserPassword({ email, pin, password });
    result.message = new PasswordResetNotice(result.message);
    return result;
  }
  async postLoginForm(email, password) {
    const result = await this.#repo.postLogin(email, password);
    if (result.message) result.message = new LoginNotice(result.message);
    const entity = User.from(result);
    return UserDTO.from(entity.to());
  }

  putNewCollectionInUser(user) {
    const entity = User.from(user);
    return this.#repo.putUserCollection(entity.to());
  }
}
