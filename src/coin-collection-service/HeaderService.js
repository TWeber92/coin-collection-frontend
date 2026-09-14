import { HeaderDTO } from "../coin-collection-dto/HeaderDTO.js";
import { HeaderEntity } from "../coin-collection-entity/HeaderEntity.js";
import { HeaderRepository } from "../coin-collection-repository/HeaderRepository.js";

export class HeaderService {
  constructor() {
    this.#repo = new HeaderRepository();
    this.#putContextInHeader();
  }

  #repo;

  #putContextInHeader() {
    const dto = HeaderDTO.fromEntity({});
    const entity = HeaderEntity.fromDTO(dto);
    if (dto.collection.archive.count < 1) entity.buttons[2].remove();
    const [h3, menu, btn, nav] = entity.nodes;
    this.#repo.putContextInHeader([h3, menu, btn]);
    this.#repo.putNavItemsInMenu({ menu, items: entity.buttons });
    this.#repo.putNavAfterHeader(nav);
  }
  putNewCountInBadge(body) {
    const dto = HeaderDTO.fromEntity(body);
    const count = dto.collection.archive.count;
    const archive = this.#repo.getExistingArchiveButton(dto.archiveId);
    console.log(archive);

    const entity = HeaderEntity.fromDTO(dto);
    if (!archive && count > 0)
      this.#repo.putArchiveButtonInEntity({
        b: entity.buttons[2],
        id: entity.menuBtnId,
      });
    const badges = [...this.#repo.getBadgesFromEntity(entity.badgeId)];
    Object.entries(dto.collection).forEach(([key, value]) => {
      const badge = badges.find((b) => b.dataset.badge === key);
      if (badge) this.#repo.putNewCountInBadge({ b: badge, c: value.count });
    });
    return this.#repo.getFavoritesButtonFromEntity(entity.favoritesId);
  }
  putNewIconInHeader(body) {
    const dto = HeaderDTO.fromEntity(body);
    const { menuBtnId } = HeaderEntity.fromDTO(dto);
    const buttons = this.#repo.getNavItemsFromDocBody();
    const menuBtn = this.#repo.getMenuButtonById(menuBtnId);
    this.#repo.putMenuNavOnOffDisplay(buttons);
    this.#repo.putNewMenuButtonInHeader(menuBtn);
  }
  putMenuNavOnOffDisplay(body) {
    this.putNewIconInHeader(body);
  }
}
