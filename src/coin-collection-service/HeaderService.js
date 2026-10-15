import { HeaderDTO } from "../coin-collection-dto/HeaderDTO.js";
import { Header } from "../coin-collection-entity/Header.js";
import { BrowserRepository } from "../coin-collection-repository/BrowserRepository.js";
import { HeaderView } from "../coin-collection-view/HeaderView.js";

export class HeaderService {
  constructor(repo, browser) {
    this.#repo = repo;
    this.#browser = browser;
  }

  #repo;
  #browser;

  getHeaderContext() {
    const header = this.#repo.entity.header.children;
    const buttons = this.#repo.getButtonsFromEntity();
    const entity = Header.from({
      header: this.#repo.entity.header,
      mobile: this.#repo.entity.nav,
      menu: header[1],
      hamburger: header[2],
      buttons,
    });
    return HeaderDTO.from(entity.to());
  }
  putContextInHeader(user) {
    const { headerContext, headerBtns } = HeaderView.from({ user });
    const context = this.#repo.getHeaderContextWithHtml(headerContext);
    const buttons = this.#repo.getHeaderContextWithHtml(headerBtns);
    const entity = Header.from({
      title: context[0],
      menu: context[1],
      hamburger: context[2],
      mobile: context[3],
      buttons,
    }).to();
    const { archive } = entity.buttons;
    const localArchive = this.#browser.getLocalStorageByKey(archive.id);
    if (localArchive.length < 1) entity.buttons.archive.remove();
    this.#repo.putHeaderAssemblyTogether(entity);
  }
  putNewCountInBadge(collection) {
    const html = HeaderView.from({});
    const headerBtns = [
      ...this.#repo.getHeaderContextWithHtml(html.headerBtns),
    ];
    const header = this.#repo.entity.header.children;
    const buttons = this.#repo.getButtonsFromEntity();
    const entity = Header.from({
      menu: header[1],
      buttons,
      ...collection,
    }).to();
    const { favorites, archive } = entity.buttons;
    const count = entity.collection.archive;
    // const archive = entity.buttons[2] || null;
    const badge = this.#repo.getExistingBadgeFromButton(favorites);
    if (!archive && count > 0)
      this.#repo.putArchiveButtonInEntity(headerBtns[2]);
    const badges = [...this.#repo.getBadgesFromEntity(badge.id)];
    Object.entries(entity.collection).forEach(([key, count]) => {
      const badge = badges.find((b) => b.dataset.badge === key);
      if (badge) this.#repo.putNewCountInBadge({ b: badge, c: count });
    });
    if (count < 1 && archive) entity.buttons.archive.remove();
    return HeaderDTO.from({ ...entity, buttons });
  }
  putMenuNavOnOffDisplay(menuBtn) {
    const buttons = this.#repo.getButtonsFromEntity();
    this.#repo.putMenuNavOnOffDisplay(buttons);
    this.putNewIconInHeader(menuBtn);
  }
  putNewIconInHeader(menuBtn) {
    this.#repo.putNewMenuButtonInHeader(menuBtn);
  }
  deleteAboutHeaderButton(user) {
    console.log(user);
    
    const buttons = this.#repo.getButtonsFromEntity();
    const authenticated = user.authenticated;
    const entity = Header.from({ buttons }).to();
    entity.buttons.about.hidden = !authenticated;
    entity.buttons.login.hidden = authenticated
  }
}
