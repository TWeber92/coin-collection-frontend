import { ModalDTO } from "../coin-collection-dto/ModalDTO.js";
import { ModalEntity } from "../coin-collection-entity/ModalEntity.js";
import { ModalRepository } from "../coin-collection-repository/ModalRepository.js";

export class ModalService {
  constructor() {
    this.#repo = new ModalRepository();
    this.#putModalContextInOverlay();
  }

  #repo;

  #putModalContextInOverlay() {
    const dto = ModalDTO.fromEntity({});
    const entity = ModalEntity.fromDTO(dto);
    this.#repo.putModalContextInOverlay(entity.nodes);
  }

  postStateModalContext(data) {
    const dto = ModalDTO.fromEntity(data);
    const { title, body, footer, coin } = ModalEntity.fromDTO({
      ...dto,
      template: dto.state,
    });
    this.#repo.postStateModalContext({
      t: title[0],
      b: body[0],
      f: footer,
      coin,
    });
    this.#repo.putModalOnDisplay({ coin });
  }
  postLoginModalContext(data) {
    const dto = ModalDTO.fromEntity(data);
    const { title, body, footer } = ModalEntity.fromDTO({
      ...dto,
      template: dto.login,
    });
    this.#repo.postSignUpModalContext({
      t: title[0],
      b: body[0],
      f: footer[0],
    });
    this.#repo.putModalOnDisplay();
  }
  postSignUpModalContext(data) {
    const dto = ModalDTO.fromEntity(data);
    const { title, body, footer } = ModalEntity.fromDTO({
      ...dto,
      template: dto.signup,
    });
    this.#repo.postSignUpModalContext({
      t: title[0],
      b: body[0],
      f: footer[0],
    });
    this.#repo.putModalOnDisplay();
  }
}
