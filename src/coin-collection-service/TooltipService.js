import { TooltipDTO } from "../coin-collection-dto/TooltipDTO.js";
import { TooltipEntity } from "../coin-collection-entity/TooltipEntity.js";
import { TooltipRepository } from "../coin-collection-repository/TooltipRepository.js";

export class TooltipService {
  constructor() {
    this.#repo = new TooltipRepository();
  }
  #repo;
  postAddTooltip(body) {
    const child = this.#repo.getCoinFromEntity(body.coin);
    console.log(child);

    const dto = TooltipDTO.fromEntity({ ...body, child });
    const entity = TooltipEntity.fromDTO({
      ...dto,
      template: dto.svg,
      button: dto.add,
    });
    this.#repo.postTextToSvg({ svg: entity.node[0], b: entity.button[0] });
    this.#repo.putSvgTextInButton({ svg: entity.node[0], b: entity.button[0] });
    this.#repo.postAddTooltip(entity.button[0]);
    this.#repo.putTooltipOnDisplay(entity.coin);
  }
  postArchiveTooltip(body) {
    const child = this.#repo.getCoinFromEntity(body.coin);
    const dto = TooltipDTO.fromEntity({ ...body, child });
    const entity = TooltipEntity.fromDTO({
      ...dto,
      template: dto.svg,
      button: dto.archive,
    });
    this.#repo.postTextToSvg({ svg: entity.node[0], b: entity.button[0] });
    this.#repo.putSvgTextInButton({ svg: entity.node[0], b: entity.button[0] });
    this.#repo.postArchiveTooltip(entity.button[0]);
    this.#repo.putTooltipOnDisplay(entity.coin);
  }
  postRestoreOrDeleteTooltip(body) {
    [...Array(2)].reduce((acc, _, i) => {
      const child = this.#repo.getCoinFromEntity(body.coin);
      const dto = TooltipDTO.fromEntity({ ...body, child, sweep: i });
      const entity = TooltipEntity.fromDTO({
        ...dto,
        template: dto.svg,
        button: dto.resOrDel,
      });
      const path = this.#repo.getModifiedPathFromSvg(entity.node[0]);
      this.#repo.putSemiCirclePathInSvg({ svg: entity.node[0], sc: path });
      this.#repo.postTextToSvg({ svg: entity.node[0], b: entity.button[i] });
      acc.push(
        this.#repo.putSvgTextInButton({
          svg: entity.node[0],
          b: entity.button[i],
        }),
      );
      if (i === entity.button.length - 1) {
        this.#repo.postRestoreOrDeleteTooltip(acc.reverse());
        this.#repo.putTooltipOnDisplay(entity.coin);
      }
      return acc;
    }, []);
  }
  deleteTooltip(body) {
    const dto = TooltipDTO.fromEntity(body);
    this.#repo.deleteTooltip(dto.relative);
  }
}
