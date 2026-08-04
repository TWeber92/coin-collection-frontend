import { TooltipDTO } from "../coin-collection-dto/TooltipDTO";
import { TooltipEntity } from "../coin-collection-entity/TooltipEntity";
import { TooltipRepository } from "../coin-collection-repository/TooltipRepository";

export class TooltipService extends TooltipRepository {
  constructor() {
    super(this.#getTooltip());
  }

  #getTooltip() {
    return TooltipRepository.getTooltipElement({
      id: "tooltip",
      className: "tooltip-wrapper",
      hidden: true,
      data: { location: "modal" },
    });
  }
  #postAddTooltip(body) {
    const dto = TooltipDTO.fromEntity(this.getChildElement(body.coin));
    const entity = TooltipEntity.fromDTO(dto.add);
    this.postAddTooltip(...entity.node);
    this.#putTooltipOnDisplay(body);
  }
  #postArchiveTooltip(body) {
    const dto = TooltipDTO.fromEntity(this.getChildElement(body.coin));
    const entity = TooltipEntity.fromDTO(dto.archive);
    this.postAddTooltip(...entity.node);
    this.#putTooltipOnDisplay(body);
  }
  #postRestoreOrDeleteTooltip(body) {
    const dto = TooltipDTO.fromEntity(this.getChildElement(body.coin));
    const entity = TooltipEntity.fromDTO(dto.resOrDel);
    this.postAddTooltip(...entity.node);
    this.#putTooltipOnDisplay(body);
  }
  #putTooltipOnDisplay(body) {
    this.putTooltipOnDisplay(body);
  }
  #deleteTooltip(body) {
    const relative = body.e.relatedTarget;
    if (!relative || !this.#entity.contains(relative)) this.deleteTooltip();
  }
}
