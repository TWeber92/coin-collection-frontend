import { EventRegister } from "../src/EventRegister";

export const handler = async (e) => {
  let responseBody;
  const mq = document.dataset.mq;
  const collectionController = EventRegister.controllers.collectionController;
  const carouselController = EventRegister.controllers.carouselController;
  const stateCardController = EventRegister.controllers.stateCardController;
  const usMapController = EventRegister.controllers.usMapController;
  const headerController = EventRegister.controllers.headerController;
  const req = { body: { index } };
  const res = { obj: (data) => (responseBody = data) };
  await usMapController.getAllCoinsFromMap(null, res);
  req.body.coins = responseBody;
  const activateMobileMode = async () => {
    await usMapController.getAllCoinsFromForeignObjects(null, res);
    req.body.coins = responseBody;
    await collectionController.putAllFavoritesInCollection(req, res);
    await usMapController.getCarouselPathsByIndex(req, res);
    req.body.paths = responseBody;
    await stateCardController.putStateCardsInPosition(req, null);
  };
  const activateDesktopMode = async () => {
    await collectionController.getUsersCollection(req, null);
    await usMapController.putStatesBackInMap(req, null);
    await usMapController.putCoinsBackInMap(req, null);
  };
  //   const mq = window.matchMedia("(max-width: 768px)").matches;
  mq ? await activateMobileMode() : await activateDesktopMode();
};
