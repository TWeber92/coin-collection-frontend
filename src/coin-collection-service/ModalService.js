import { ModalDTO } from "../coin-collection-dto/ModalDTO.js";
import { ModalEntity } from "../coin-collection-entity/ModalEntity.js";
import { ModalRepository } from "../coin-collection-repository/ModalRepository.js";

export class ModalService extends ModalRepository {
  constructor() {
    super(ModalService.#getModal());
  }

  static #getModal() {
    return ModalRepository.getModalElement({
      id: "overlay",
      className: "modal-overlay",
      hidden: true,
    });
  }

  #postStateModal(body) {
    const dto = ModalDTO.fromEntity(body);
    const entity = ModalEntity.fromDTO(dto);
    const collected = this.getCollectedFromStateModal(entity);
    this.postStateModal(entity.node);
    this.putCoinAfterCollected({ ...entity, collected });
    this.putModalOnDisplay();
  }
  #postLoginModal(body) {
    const dto = ModalDTO.fromEntity(body);
    const entity = ModalEntity.fromDTO(dto);
    this.postLoginModal(entity.node);
    this.putModalOnDisplay();
  }
  #postSignUpModal(body) {
    const dto = ModalDTO.fromEntity(body);
    const entity = ModalEntity.fromDTO(dto);
    this.postSignUpModal(entity.node);
    this.putModalOnDisplay();
  }
}
