import { Tooltip } from "../coin-collection-entity/Tooltip.js";
import { TooltipView } from "../coin-collection-view/TooltipView.js";

export class TooltipService {
  constructor(repo) {
    this.#repo = repo;
  }
  #repo;

  postAddTooltip(coin) {
    const coinEntity = this.#repo.getCoinEntity(coin);
    const { svg, add } = TooltipView.from({ coin: coinEntity });
    const tooltip = this.#repo.getTooltipWithHtml(svg + add);
    const entity = Tooltip.from({
      svg: tooltip[0],
      button: tooltip[1],
      entity: coinEntity,
    }).to();
    this.#repo.postTextToSvg(entity.svg, entity.button);
    this.#repo.putSvgTextInButton({ svg: entity.svg, b: entity.button });
    this.#repo.postAddTooltip(entity.button);
    this.#repo.putTooltipOnDisplay(entity.coin.entity);
  }
  postArchiveTooltip(coin) {
    const coinEntity = this.#repo.getCoinEntity(coin);
    const { svg, archive } = TooltipView.from({ coin: coinEntity });
    const tooltip = this.#repo.getTooltipWithHtml(svg + archive);
    const entity = Tooltip.from({
      svg: tooltip[0],
      button: tooltip[1],
      entity: coinEntity,
    }).to();
    this.#repo.postTextToSvg(entity.svg, entity.button);
    this.#repo.putSvgTextInButton({ svg: entity.svg, b: entity.button });
    this.#repo.postArchiveTooltip(entity.button);
    this.#repo.putTooltipOnDisplay(entity.coin.entity);
    console.log(entity.coin.entity);
  }
  postRestoreOrDeleteTooltip(coin) {
    [...Array(2)].reduce((acc, _, i) => {
      const coinEntity = this.#repo.getCoinEntity(coin);
      const { svg, resOrDel } = TooltipView.from({
        coin: coinEntity,
        sweep: i,
      });
      const tooltip = this.#repo.getTooltipWithHtml(svg + resOrDel);
      const length = tooltip.length;
      const entity = Tooltip.from({
        svg: tooltip[0],
        button: tooltip[i + 1],
        entity: coinEntity,
      }).to();
      const path = this.#repo.getModifiedPathFromSvg(entity.svg);
      this.#repo.putSemiCirclePathInSvg({ svg: entity.svg, sc: path });
      this.#repo.postTextToSvg(entity.svg, entity.button);
      acc.push(
        this.#repo.putSvgTextInButton({ svg: entity.svg, b: entity.button }),
      );
      if (i + 1 === length - 1) {
        this.#repo.postRestoreOrDeleteTooltip(acc.reverse());
        this.#repo.putTooltipOnDisplay(entity.coin.entity);
      }
      return acc;
    }, []);
  }
  deleteTooltip(tooltip, relatedTarget, clone) {
    this.#repo.deleteTooltip({ tt: tooltip, rt: relatedTarget, c: clone });
  }
}
