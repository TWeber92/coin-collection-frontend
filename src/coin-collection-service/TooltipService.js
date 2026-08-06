import { TooltipDTO } from "../coin-collection-dto/TooltipDTO.js";
import { TooltipEntity } from "../coin-collection-entity/TooltipEntity.js";
import { TooltipRepository } from "../coin-collection-repository/TooltipRepository.js";

export class TooltipService extends TooltipRepository {
  constructor() {
    super(TooltipService.#getTooltip());
  }

  static #getTooltip() {
    return TooltipRepository.getTooltipElement({
      id: "tooltip",
      className: "tooltip-wrapper",
      hidden: true,
    });
  }
  #postAddTooltip(body) {
    const coin = this.getChildElement(body.coin);
    const dto = TooltipDTO.fromEntity(coin);
    const entity = TooltipEntity.fromDTO(dto.add);
    this.postAddTooltip(entity.node);
    this.putTooltipOnDisplay(coin);
  }
  #postArchiveTooltip(body) {
    const coin = this.getChildElement(body.coin);
    const dto = TooltipDTO.fromEntity(coin);
    const entity = TooltipEntity.fromDTO(dto.archive);
    this.postAddTooltip(entity.node);
    this.putTooltipOnDisplay(coin);
  }
  #postRestoreOrDeleteTooltip(body) {
    const coin = this.getChildElement(body.coin);
    const dto = TooltipDTO.fromEntity(coin);
    const entity = TooltipEntity.fromDTO(dto.resOrDel);
    this.postAddTooltip(entity.node);
    this.putTooltipOnDisplay(coin);
  }
  #deleteTooltip(body) {
    const relative = body.e.relatedTarget;
    this.deleteTooltip(relative);
  }
}
