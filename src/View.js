import { CoinCollectionError } from "./coin-collection-exception/CoinCollectionError.js";
import { CarouselView } from "./coin-collection-view/CarouselView.js";
import { CoinView } from "./coin-collection-view/CoinView.js";
import { CollectionView } from "./coin-collection-view/CollectionView.js";
import { HeaderView } from "./coin-collection-view/HeaderView.js";
import { ModalView } from "./coin-collection-view/ModalView.js";
import { PageView } from "./coin-collection-view/PageView.js";
import { TooltipView } from "./coin-collection-view/TooltipView.js";
import { UsMapView } from "./coin-collection-view/UsMapView.js";

export class View {
  #views = {};

  constructor() {
    CoinCollectionError.postErrorNode()
    this.#views.collectionView = new CollectionView({});
    this.#views.headerView = new HeaderView({});
    this.#views.usMapView = new UsMapView({});
    this.#views.carouselView = new CarouselView({});
    this.#views.coinView = new CoinView({})
    this.#views.pageView = new PageView({});
    this.#views.modalView = new ModalView({})
    this.#views.tooltipView = new TooltipView({});
  }

  get views() {
    return this.#views;
  }
}
