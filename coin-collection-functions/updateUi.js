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
    body: {
      user: e,
      favoritesId: "favorites",
      archiveId: "archive",
      foTag: "foreignObject",
      menuId: "hamburger",
      badgeId: "badge",
      coinId: "coin",
    },
  };
  const res = { obj: (data) => (responseBody = data) };
  if (e.type === "load") await restore(req, res);

  const activateMobileMode = async () => {
    console.log("Mobile Mode");
    await usMapController.putStatesBackInMap(req, res);
    await usMapController.getCarouselPathsByIndex(req, res);
    req.body = { ...req.body, ...responseBody };
    await carouselController.putSlidesInPosition(req, res);
    await usMapController.getAllCoinsFromForeignObjects(req, res);
    req.body.coins = responseBody;
    if (responseBody)
      await collectionController.putAllFavoritesInCollection(req, res);
    await usMapController.putMapOnOffDisplay(req, res);
    await carouselController.putCarouselOnOffDisplay(req, res);
  };
  const activateDesktopMode = async () => {
    console.log("Desktop Mode");
    await usMapController.putStatesBackInMap(req, res);
    req.body.collectionId = req.body.favoritesId;
    await collectionController.getCollectionById(req, res);
    req.body.collection = responseBody.collection;
    await usMapController.putCoinsBackInMap(req, res);
    if (navIsOpen) headerController.putMenuNavOnOffDisplay(req, res);
    await carouselController.putCarouselOnOffDisplay(req, res);
    await usMapController.putMapOnOffDisplay(req, res);
  };
  mq ? await activateMobileMode() : await activateDesktopMode();
};

export const restore = async (req) => {
  document.body.style.cursor = "wait";
  const userController = EventRegister.controllers.userController;
  const collectionController = EventRegister.controllers.collectionController;
  const coinController = EventRegister.controllers.coinController;
  const headerController = EventRegister.controllers.headerController;
  let responseBody;
  const res = { obj: (data) => (responseBody = data) };
  // await userController.getUserAndAuthState();
  // req.body.user = responseBody;
  await collectionController.getUserSyncedCollection(req, res);
  req.body.collection = responseBody.names;
  console.log(req.body.collection);
  // req.body.user.authenticated = responseBody.authenticated;
  for (const [k, v] of Object.entries(req.body.collection)) {
    req.body.collectionId = k;
    await collectionController.getCollectionById(req, res);
    const collection = responseBody.collection?.lastChild;
    if (collection) {
      for (const n of v) {
        req.body.name = n;
        await coinController.updateCoinEntity(req, res);
        const coin = responseBody.coin.cloneNode(true);
        coin.hidden = false;
        coin.dataset.location = k;
        collection.append(coin);
      }
    }
    delete req.body.collection;
    delete req.body.user;
    req.body.menuId = "menu";
    await headerController.putNewCountInBadge(req, res);
  }
  // if (req.body.user.authenticated)
  //   userController.putNamesInUserCollection(req, res);
  document.body.style.cursor = "default";
};
