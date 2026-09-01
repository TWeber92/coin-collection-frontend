import { ModalDTO } from "../coin-collection-dto/ModalDTO.js";
import { ModalEntity } from "../coin-collection-entity/ModalEntity.js";
import { ModalRepository } from "../coin-collection-repository/ModalRepository.js";

export class ModalService extends ModalRepository {
  constructor() {
    super(ModalService.#getModal());
  }

  #init = this.#putModalContextInOverlay();

  static #getModal() {
    return ModalRepository.getModalElement({
      id: "overlay",
      className: "modal-overlay",
      hidden: true,
    });
  }
  #putModalContextInOverlay() {
    const dto = ModalDTO.fromEntity({});
    const entity = ModalEntity.fromDTO(dto);
    super.putModalContextInOverlay(entity.nodes);
  }

  postStateModalContext(data) {
    const dto = ModalDTO.fromEntity(data);
    const { title, body, footer, coin } = ModalEntity.fromDTO({
      ...dto,
      template: dto.state,
    });
    super.postStateModalContext({ t: title[0], b: body[0], f: footer, coin });
    this.putModalOnDisplay();
  }
  postLoginModalContext(data) {
    const dto = ModalDTO.fromEntity(data);
    const { title, body, footer } = ModalEntity.fromDTO({
      ...dto,
      template: dto.login,
    });
    super.postSignUpModalContext({ t: title[0], b: body[0], f: footer[0] });
    this.putModalOnDisplay();
  }
  postSignUpModalContext(data) {
    const dto = ModalDTO.fromEntity(data);
    const { title, body, footer } = ModalEntity.fromDTO({
      ...dto,
      template: dto.signup,
    });
    super.postSignUpModalContext({ t: title[0], b: body[0], f: footer[0] });
    this.putModalOnDisplay();
  }
}
