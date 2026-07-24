import { TooltipDTO } from "../coin-collection-dto/TooltipDTO";
import { TooltipEntity } from "../coin-collection-entity/TooltipEntity";
import { DocumentStore } from "../DocumentStore";

export class TooltipService {
  constructor(repo) {
    this.#tooltipRepository = repo(this.#entity);
  }
  #entity = this.#getTooltip();
  #tooltipRepository;
  #getTooltip() {
    const tooltip = DocumentStore.createDivElement({
      id: "tooltip",
      className: "tooltip-wrapper",
      hidden: true,
    }).appendTo(document.body);
    TooltipEntity.tooltip = tooltip;
    return TooltipEntity.tooltip;
  }
  #postAddTooltip(body) {
    const id = this.#tooltipRepository.getChildElement(body.coin).id;
    const template = TooltipDTO.toEntity(id);
    const element = TooltipEntity.fromDTO(template.add);
    this.#tooltipRepository.postAddTooltip(...element, body);
    this.#putTooltipOnDisplay(body);
  }
  #postArchiveTooltip(body) {
    const id = this.#tooltipRepository.getChildElement(body.coin).id;
    const template = TooltipDTO.toEntity(id);
    const element = TooltipEntity.fromDTO(template.archive);
    this.#tooltipRepository.postArchiveTooltip(...element, body);
    this.#putTooltipOnDisplay(body);
  }
  #postRestoreOrDeleteTooltip(body) {
    const id = this.#tooltipRepository.getChildElement(body.coin).id;
    const template = TooltipDTO.toEntity(id);
    const element = TooltipEntity.fromDTO(template.resOrDel);
    this.#tooltipRepository.postRestoreOrDeleteTooltip(...element, body);
    this.#putTooltipOnDisplay(body);
  }
  #putTooltipOnDisplay(body) {
    this.#tooltipRepository.putTooltipOnDisplay(body);
  }
  #deleteTooltip(body) {
    const relative = body.e.relatedTarget;
    if (!relative || !this.#entity.contains(relative))
      this.#tooltipRepository.deleteTooltip(body);
  }
}
