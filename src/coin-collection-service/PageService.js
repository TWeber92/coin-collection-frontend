import { PageDTO } from "../coin-collection-dto/PageDTO";
import { PageEntity } from "../coin-collection-entity/PageEntity";
import { PageRepository } from "../coin-collection-repository/PageRepository";

export class PageService extends PageRepository {
  constructor() {
    super(this.#getPage());
  }

  #init = this.#getCollectionPage();

  #getPage() {
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
    this.postCollectionPage(PageEntity.collections);
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
