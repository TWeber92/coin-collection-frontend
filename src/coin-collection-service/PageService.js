import { PageDTO } from "../coin-collection-dto/PageDTO.js";
import { PageEntity } from "../coin-collection-entity/PageEntity.js";
import { PageRepository } from "../coin-collection-repository/PageRepository.js";

export class PageService extends PageRepository {
  constructor() {
    super(PageService.#getPage());
  }

  static #getPage() {
    return PageRepository.getPageElement({
      id: "overlay",
      className: "page-overlay",
      hidden: true,
    });
  }

  #postCollectionPage(body) {
    const pageHidden = this.getPageEntityHiddenState();
    const collectionExists = this.getCollectionById({ id: body.collectionId });
    const collectionHidden = this.getCollectionHiddenState(body);
    if (pageHidden && collectionExists) return pageHidden && !collectionHidden;
    if ((collectionHidden && collectionExists) || !collectionHidden)
      return pageHidden && !collectionHidden;
    const dto = PageDTO.fromEntity(body);
    const entity = PageEntity.fromDTO(dto);
    this.putCollectionInPageBody({
      b: entity.body,
      id: entity.id,
      col: entity.collection,
    });
    this.putCollectionPageTogether({
      t: entity.node,
      h: entity.header,
      b: entity.body,
    });
    this.postTemplateToPageEntity(entity.node);
    return false;
  }

  putFavoritesOnPage(body) {
    return this.#postCollectionPage(body);
  }
  putArchivedOnPage(body) {
    return this.#postCollectionPage(body);
  }
}
