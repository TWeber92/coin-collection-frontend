import { EventRegister } from "../src/EventRegister";

export const handler = (e) => {
  let responseBody;
  const mq = e.target.dataset.mq;
  const collectionController = EventRegister.controllers.collectionController;
  const carouselNavController = EventRegister.controllers.carouselNavController;
  const stateCardController = EventRegister.controllers.stateCardController;
  const usMapController = EventRegister.controllers.usMapController;
  const req = { body: { index } };
  const res = { obj: (data) => (responseBody = data) };
  const activateMobileMode = () => {
    collectionController.updatecollectionLocation(req, null);
    carouselNavController.getNavIndex(req, res);
    req.body.index = responseBody;
    stateCardController.putStateCardsInPosition(req, null);
  };
  const activateDesktopMode = () => {
    usMapController.putStatesBackInMap(req, null);
    usMapController.putCoinsBackInMap(req, null);
  };
  //   const mq = window.matchMedia("(max-width: 768px)").matches;
  mq ? activateMobileMode() : activateDesktopMode();
};
