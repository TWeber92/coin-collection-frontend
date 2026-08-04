import { ModalDTO } from "../coin-collection-dto/ModalDTO";
import { ModalEntity } from "../coin-collection-entity/ModalEntity";
import { ModalRepository } from "../coin-collection-repository/ModalRepository";

export class ModalService extends ModalRepository {
  constructor() {
    super(this.#getModal());
  }

  #getModal() {
    return ModalRepository.getModalElement({
      id: "overlay",
      className: "modal-overlay",
      hidden: true,
    });
  }

  #postStateModal(body) {
    const dto = ModalDTO.fromEntity(body);
    const entity = ModalEntity.fromDTO(dto);
    this.postStateModal(...entity.node);
    body.collected = this.getContainerFromEntityById(`#${entity.collectedId}`);
    this.putCoinAfterCollected(body);
    this.putModalOnDisplay();
  }
  #postLoginModal(body) {
    const dto = ModalDTO.fromEntity(body);
    const entity = ModalEntity.fromDTO(dto).node;
    this.postLoginModal(...entity);
    this.putModalOnDisplay();
  }
  #postSignUpModal(body) {
    const dto = ModalDTO.fromEntity(body);
    const entity = ModalEntity.fromDTO(dto).node;
    this.postSignUpModal(...entity);
    this.putModalOnDisplay();
  }
}
