import { PageDTO } from "../coin-collection-dto/PageDTO.js";
import { PageEntity } from "../coin-collection-entity/PageEntity.js";
import { PageRepository } from "../coin-collection-repository/PageRepository.js";

export class PageService extends PageRepository {
  constructor() {
    super(PageService.#getPage());
  }

  #init = this.#getCollectionPage();

  static #getPage() {
    return PageRepository.getPageElement({
      id: "overlay",
      className: "page-overlay",
      hidden: true,
    });
  }
  #getCollectionPage() {
    const dto = PageDTO.fromEntity({});
    const entity = PageEntity.fromDTO(dto.template);
    PageEntity.collections = entity.node;
  }

  #postCollectionPage(body) {
    const dto = PageDTO.fromEntity(body);
    const entity = PageEntity.fromDTO(dto);
    this.postCollectionPage(entity.collections);
    const container = this.getCollectionContainerBySet(dto.id);
    this.putCollectionInPageContainer({
      con: container,
      col: entity.collection,
    });
  }

  #putFavoritesOnPage(body) {
    this.#postCollectionPage(body);
  }
  #putArchivedOnPage(body) {
    this.#postCollectionPage(body);
  }
}
