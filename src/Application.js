import { CarouselService } from "./coin-collection-service/CarouselService";
import { CoinService } from "./coin-collection-service/CoinService";
import { CollectionService } from "./coin-collection-service/CollectionService";
import { HeaderService } from "./coin-collection-service/HeaderService";
import { ModalService } from "./coin-collection-service/ModalService";
import { TooltipService } from "./coin-collection-service/TooltipService";
import { USMapService } from "./coin-collection-service/USMapService";
import { EventRegister } from "./EventRegister";

export class Application {
  constructor() {
    this.#eventRegister = new EventRegister(this.#services);
    document.documentElement.dataset.mq =
      window.matchMedia("(max-width: 768px)").matches;
  }
  #services = {
    headerService: new HeaderService(),
    usMapService: new USMapService(),
    carouselService: new CarouselService(),
    collectionService: new CollectionService(),
    coinService: new CoinService(),
    modalService: new ModalService(),
    tooltipService: new TooltipService(),
  };
}
