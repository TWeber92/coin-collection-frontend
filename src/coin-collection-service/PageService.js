import { PageDTO } from "../coin-collection-dto/PageDTO.js";
import { Page } from "../coin-collection-entity/Page.js";
import { PageView } from "../coin-collection-view/PageView.js";

export class PageService {
  constructor(repo) {
    this.#repo = repo;
  }

  #repo;

  postAboutPage(user) {
    const pageHidden = this.#repo.entity.hidden;
    if (!pageHidden) return;
    const { page, aboutPage } = PageView.from({ user });
    const { header, body, footer } = aboutPage;
    const pageContext = this.#repo.getPageContextWithHtml(
      page + header + body + footer,
    );
    const entity = Page.from({
      page: [...pageContext].slice(0, 3),
      header: [...pageContext].slice(3, 5),
      body: [...pageContext].slice(5, 7),
      footer: [...pageContext].slice(7),
    });
    this.#repo.putAboutPageTogether(entity.to());
    this.#repo.putPageOnOffDisplay();
  }

  postCollectionPage() {
    const { page, collectionPage } = PageView.from({});
    const { header, body, footer } = collectionPage;
    const pageContext = this.#repo.getPageContextWithHtml(
      page + header + body + footer,
    );
    const entity = Page.from({
      page: [...pageContext].slice(0, 3),
      header: [...pageContext].slice(3, 5),
      body: [...pageContext].slice(5, 7),
      footer: [...pageContext].slice(7),
    });
    this.#repo.putCollectionPageTogether(entity.to());
  }
  putFavoritesOnPage(favorites, archive, favoritesId, archiveId) {
    const pageHidden = this.#repo.entity.hidden;
    const getDto = () =>
      PageDTO.from({ entity: this.#repo.entity, wasClosed: pageHidden });
    const updateArrow = () =>
      this.#repo.putArrowInNewOrientation({
        id: favoritesId,
        col: favorites,
      });
    if (pageHidden) this.#repo.putPageOnOffDisplay();
    const container = this.#repo.getBodySectionById(favoritesId);
    const collection = this.#repo.getBodySectionById(favorites.id); //pull body w/ fid, pull the collection with collection.id
    if (collection) {
      updateArrow();
      return getDto();
    }
    if (!container) this.postCollectionPage();
    updateArrow();
    this.#repo.putCollectionInPageById({ id: favoritesId, c: favorites });
    if (archive)
      this.#repo.putCollectionInPageById({ id: archiveId, c: archive });
    else this.#repo.deleteArchiveButton();
    return getDto();
  }

  putArchiveOnPage(favorites, archive, favoritesId, archiveId) {
    const pageHidden = this.#repo.entity.hidden;
    const getDto = () =>
      PageDTO.from({ entity: this.#repo.entity, wasClosed: pageHidden });
    const updateArrow = () =>
      this.#repo.putArrowInNewOrientation({
        id: archiveId,
        col: archive,
      });
    if (pageHidden) this.#repo.putPageOnOffDisplay();
    const container = this.#repo.getBodySectionById(archiveId);
    const collection = this.#repo.getBodySectionById(archive.id); //pull body w/ aid, pull the collection with archive.id
    if (collection) {
      updateArrow();
      return getDto();
    }
    if (!container) this.postCollectionPage();
    updateArrow();
    this.#repo.putCollectionInPageById({ id: favoritesId, c: favorites });
    this.#repo.putCollectionInPageById({ id: archiveId, c: archive });
    return getDto();
  }

  putArchiveInNewPosition(button, archive) {
    const direction = button.dataset.dir;
    this.#repo.putArchiveInNewPosition({
      a: archive,
      d: direction,
    });
  }

  putFooterContentsOnOffPage(id, archive, archiveCount) {
    const btns = this.#repo.getFooterContentById(id);
    btns.forEach((b) => {
      if (archive.hidden) b.hidden = true;
      else if (archiveCount > 3) b.hidden = false;
      else b.hidden = true;
    });
  }

  deletePageFromDisplay() {
    const pageHidden = this.#repo.entity.hidden;
    if (!pageHidden) this.#repo.putPageOnOffDisplay();
  }
}
