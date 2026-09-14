import { PageDTO } from "../coin-collection-dto/PageDTO.js";
import { PageEntity } from "../coin-collection-entity/PageEntity.js";
import { PageRepository } from "../coin-collection-repository/PageRepository.js";

export class PageService {
  constructor() {
    this.#repo = new PageRepository();
  }

  #repo;

  #postCollectionPage(body) {
    const dto = PageDTO.fromEntity({
      ...body,
      pageHidden: this.#repo.getPageEntityHiddenState(),
      collectionExists: this.#repo.getCollectionById({ id: body.collectionId }),
      collectionHidden: this.#repo.getCollectionHiddenState(body),
    });
    this.#repo.putPageOnDisplayIfHidden();
    if (dto.phCe || dto.chCeOrNotCh) return dto.phNotCh;
    const sibling = this.#repo.getExistingArchiveSibling(dto.button);
    const entity = PageEntity.fromDTO(dto);
    const favorites = this.#repo.getBodySectionById(entity.body[0].id);
    if (favorites) entity.body[0].replaceWith(favorites);
    const archive = this.#repo.getBodySectionById(entity.footer[0].name);
    if (!sibling && !entity.footer[entity.id] && !archive)
      entity.body[1].remove();
    if (archive) entity.body[1].replaceWith(archive);
    this.#repo.putCollectionInPageBody({
      b: entity.body,
      id: entity.id,
      col: entity.collection,
    });
    this.#repo.putCollectionPageTogether({
      t: entity.node,
      h: entity.header,
      b: entity.body,
      f: entity.footer,
    });
    this.#repo.postTemplateToPageEntity(entity.node);
    return false;
  }

  putFavoritesOnPage(body) {
    return this.#postCollectionPage(body);
  }
  putArchiveOnPage(body) {
    return this.#postCollectionPage(body);
  }
  putArchiveInNewPosition(body) {
    const dto = PageDTO.fromEntity(body);
    console.log(dto.button.name);

    const archive = this.#repo.getCollectionById({ id: dto.button.name });
    console.log(archive);
    const entity = PageEntity.fromDTO({ ...dto, collection: archive });
    this.#repo.putArchiveInNewPosition({
      c: entity.collection,
      d: entity.direction,
    });
    return true;
  }
  putFooterContentsOnOffDisplay(body) {
    const { id } = PageDTO.fromEntity(body);
    this.#repo.getFooterContentById(id).forEach((b) => (b.hidden = !b.hidden));
  }
}
