import { HeaderDTO } from "../coin-collection-dto/HeaderDTO.js";
import { HeaderEntity } from "../coin-collection-entity/HeaderEntity.js";
import { HeaderRepository } from "../coin-collection-repository/HeaderRepository.js";

export class HeaderService extends HeaderRepository {
  constructor() {
    super(HeaderService.#getHeader());
  }

  #init = this.#putContextInHeader();

  static #getHeader() {
    return HeaderRepository.getHeaderElement({
      id: "header",
      className: "doc-header",
    });
  }
  #putContextInHeader() {
    const dto = HeaderDTO.fromEntity({});
    const [h1, menu, btn, nav] = HeaderEntity.fromDTO(dto).node;
    this.putContextInHeader([h1, menu, btn]);
    this.putNavAfterHeader(nav);
  }
  #updateMenuCounter(body) {
    const dto = HeaderDTO.fromEntity({});
    const entity = HeaderEntity.fromDTO(dto);
    const id = `#${entity.id}`;
    const headerBadges = [...this.getBadgesFromHeader(id)];
    const nav = this.getMenuNav();
    const navBadges = [...this.getBadgesFromNav({ id, nav })];
    const badges = [...headerBadges, ...navBadges];
    Object.entries(dto.collections).forEach(([key, value]) =>
      badges
        .filter((b) => b.dataset.badge === key)
        .forEach((b) => this.putNewCountInBadge({ b, c: value.count })),
    );
  }
  #updateMenuView() {
    const nav = this.getMenuNav();
    const menuBtn = this.getMenuButton();
    const hidden = nav.hidden;
    this.putMenuNavOnDisplay({ nav, hidden });
    this.updateMenuIcon({ menuBtn, hidden });
  }
}
