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
    const entity = HeaderEntity.fromDTO(dto);
    const [h3, menu, btn, nav] = entity.nodes;
    this.putContextInHeader([h3, menu, btn]);
    this.putNavItemsInMenu({ menu, items: entity.buttons });
    this.putNavAfterHeader(nav);
  }
  putNewCountInBadge(body) {
    const dto = HeaderDTO.fromEntity(body);
    const entity = HeaderEntity.fromDTO(dto);
    const id = `#${entity.id}`;
    const headerBadges = [...this.getBadgesFromHeader(id)];
    const nav = this.getMenuNavSibling();
    const navBadges = [...this.getBadgesFromNav({ id, nav })];
    const badges = [...headerBadges, ...navBadges];
    Object.entries(dto.collections).forEach(([key, value]) =>
      badges
        .filter((b) => b.dataset.badge === key)
        .forEach((b) => super.putNewCountInBadge({ b, c: value.count })),
    );
  }
  putNewIconInHeader(body) {
    const dto = HeaderDTO.fromEntity(body);
    const { menuBtnId } = HeaderEntity.fromDTO(dto);
    const buttons = this.getNavItemsFromDocBody();
    const nav = this.getMenuNavSibling();
    const menuBtn = this.getMenuButtonById(menuBtnId);
    const hidden = nav.hidden;
    super.putMenuNavOnOffDisplay({ nav, hidden, buttons });
    super.putNewIconInHeader({ menuBtn, nav });
  }
  putMenuNavOnOffDisplay(body) {
    this.putNewIconInHeader(body);
  }
}
