import { AuthDTO } from "../coin-collection-dto/AuthDTO.js";
import { AuthEntity } from "../coin-collection-entity/AuthEntity.js";
import { AuthRepository } from "../coin-collection-repository/AuthRepository.js";
import { UserValidator } from "../coin-collection-validation/UserValidator.js";

export class AuthService {
  constructor() {
    this.#repo = new AuthRepository();
  }

  #repo;

  getEmailInputValidation(body) {
    this.#getInputValidation(body);
  }
  getPasswordInputValidation(body) {
    this.#getInputValidation(body);
  }
  getPasswordMatchValidation(body) {
    this.#getInputValidation(body);
  }
  #getInputValidation(body) {
    const setSpan = (s, n) => this.#repo.putSpanContextOnDisplay({ s, n });
    const setButton = (button, inputs) =>
      (button.disabled = !inputs.every((i) => i.checkValidity()));
    const dto = AuthDTO.fromEntity({
      ...body,
      inputs: [...this.#repo.getInputsFromForm(body.input)],
      span: this.#repo.getSpanSibling(body.input),
    });
    body.input.disable = () => setButton(dto.button, dto.inputs);
    const confirm = UserValidator.validateUserInput(body.input);
    const entity = AuthEntity.fromDTO(dto);
    setSpan(entity.sibling, entity.node[0]);
    if (confirm?.interacted) {
      UserValidator.validateUserInput(confirm);
      setSpan(this.#repo.getSpanSibling(confirm), entity.node[0]);
    }
    setButton(entity.button, entity.inputs);
  }
  putNamesInUserCollection(body) {
    const dto = AuthDTO.fromEntity(body.user);
  }
}
