import { EventRegister } from "../src/EventRegister.js";

export const handler = async (e) => {
  let responseBody;
  const mq = window.matchMedia("(max-width: 768px)").matches;
  const navIsOpen = !document.body.querySelector("#nav-menu").hidden;
  const collectionController = EventRegister.controllers.collectionController;
  const carouselController = EventRegister.controllers.carouselController;
  const usMapController = EventRegister.controllers.usMapController;
  const headerController = EventRegister.controllers.headerController;
  const req = {
    body: { collectionId: "favorites", svgId: "state", menuId: "hamburger" },
  };
  const res = { obj: (data) => (responseBody = data) };
  const activateMobileMode = async () => {
    console.log("Mobile Mode");

    await usMapController.putStatesBackInMap(req, null);
    await usMapController.getCarouselPathsByIndex(req, res);
    req.body = { ...req.body, ...responseBody };
    // req.body.entity = responseBody;
    await carouselController.putSlidesInPosition(req, res);
    await usMapController.putMapOnOffDisplay(req, res);
    await carouselController.putCarouselOnOffDisplay(req, res);
  };
  const activateDesktopMode = async () => {
    console.log("Desktop Mode");
    await usMapController.putStatesBackInMap(req, null);
    // await collectionController.getCollectionById(req, res);
    // req.body.favorites = responseBody;
    // await usMapController.putCoinsBackInMap(req, null);
    if (navIsOpen) headerController.putMenuNavOnOffDisplay(req, res);
    await carouselController.putCarouselOnOffDisplay(req, res);
    await usMapController.putMapOnOffDisplay(req, res);
  };
  mq ? await activateMobileMode() : await activateDesktopMode();
};
