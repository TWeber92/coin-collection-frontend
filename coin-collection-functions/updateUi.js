import { Application } from "../src/Application.js";
// import { EventRegister } from "../src/EventRegister.js";

export const handler = async (e) => {
  let responseBody;
  const mq = window.matchMedia("(max-width: 768px)").matches;
  const {
    collectionController,
    carouselController,
    usMapController,
    headerController,
  } = Application.controllers;
  const req = {
    body: {
      foTag: "foreignObject",
    },
  };
  const res = { obj: (data) => (responseBody = data) };

  if (e.type === "load") await restore(req, res);
  await headerController.getHeaderContext(req, res); //args - none
  req.body.header = responseBody.to();
  req.body.menuBtn = req.body.header.hamburger;
  const navIsOpen = !req.body.header.mobile.hidden;

  const activateMobileMode = async () => {
    console.log("Mobile Mode");
    await usMapController.putStatesBackInMap(req, res); //args - none
    await carouselController.postNextStateSlide(req, res); // args - none
    req.body.carousel = responseBody.to(); // CarouselDTO obj
    await usMapController.getCarouselPathsByIndex(req, res); //args - carousel.index
    req.body.usmap = responseBody.to(); //UsMapDTO obj
    await carouselController.putSlidesInPosition(req, res); //args - usmap.navPaths
    await usMapController.getAllCoinsFromForeignObjects(req, res); //args - foTag

    if (responseBody) {
      req.body.usmap.coins = responseBody.to().coins; //UsMapDTO obj.coins - the rest of the dto.
      await collectionController.putAllFavoritesInCollection(req, res); //args - usmap.coins
    }

    await usMapController.putMapOnOffDisplay(req, res); //args - none
    await carouselController.putCarouselOnOffDisplay(req, res); //args - none
  };
  const activateDesktopMode = async () => {
    console.log("Desktop Mode");
    await usMapController.putStatesBackInMap(req, res); //args - none
    req.body.favoritesId = req.body.header.buttons.favorites.id;
    await collectionController.getCollectionsById(req, res); //args - favorites
    req.body.collection = responseBody.to(); //CollectionDTO obj
    await usMapController.putCoinsBackInMap(req, res); //args collection.favorites
    if (navIsOpen) headerController.putMenuNavOnOffDisplay(req, res); //args - menuBtn
    await carouselController.putCarouselOnOffDisplay(req, res); //args - none
    await usMapController.putMapOnOffDisplay(req, res); //args - none
  };
  mq ? await activateMobileMode() : await activateDesktopMode();
};

export const restore = async (req) => {
  document.body.children["usmap"].style.cursor = "wait";
  const {
    authController,
    collectionController,
    coinController,
    carouselController,
    usMapController,
    headerController,
    modalController,
  } = Application.controllers;
  let responseBody;
  const res = { obj: (data) => (responseBody = data) };
  await authController.getMe(req, res); //args - none getMe
  req.body.user = responseBody.to(); //userDTO obj
  const userFavorites = req.body.user.collection.favorites;
  const userArchive = req.body.user.collection.archive;
  const userEmpty = !userFavorites.length && !userArchive.length; //both have to be empty
  await collectionController.putFavoritesCollectionInEntity(req, res); //args - none
  await headerController.putContextInHeader(req, res); // args - user
  await headerController.getHeaderContext(req, res); //args - none
  req.body.header = responseBody.to(); //HeaderDTO obj
  await usMapController.getUSMapSvgText(req, res);
  req.body.svg = responseBody.svg; //View Obj svg = text
  await usMapController.putMapOnDisplay(req, res); //args - svg
  await usMapController.getAndSerializePaths(req, res);
  req.body.count = responseBody.length; //Path collection
  await carouselController.getRandomIndex(req, res); //args - count
  req.body.carousel = responseBody.to(); // CarouselDTO obj
  await carouselController.putCarouselAssemblyinNav(req, res); //args - carousel.index
  await modalController.putModalContextInOverlay(req, res); //args - none
  // await authController.getMe(req, res); //args - none getMe
  // req.body.user = responseBody.to(); //userDTO obj
  // const userFavorites = req.body.user.collection.favorites;
  // const userArchive = req.body.user.collection.archive;
  // const userEmpty = !userFavorites.length && !userArchive.length; //both have to be empty
  if (req.body.user.message || userEmpty) {
    //if message is truthy we have a blank user dto, if its not truthy but collections empty, emulating signup phase
    const [fid, aid] = Object.keys(req.body.user.collection);
    req.body.favoritesId = fid;
    req.body.archiveId = aid;
    await collectionController.getCollectionsById(req, res); // args - favoritesId, archiveId
  } else await collectionController.getUserSyncedCollection(req, res); //args - user
  const localFavorites = req.body.user.collection.favorites;
  const localArchive = req.body.user.collection.archive;
  const localEmpty = !localFavorites.length || !localArchive.length;
  req.body.collection = responseBody.to(); //CollectionDTO obj
  req.body.header.collection = req.body.collection.header.collection;
  req.body.user = req.body.collection.user;
  const update = userFavorites.length !== localFavorites.length;
  const put = userArchive.length !== localArchive.length;
  const patch = req.body.user.merged || (userEmpty && !localEmpty);
  if (update || put || patch) await authController.putUserCollection(req, res); //args - user
  for (const [k, v] of Object.entries(req.body.user.collection)) {
    const collection = req.body.collection[k]?.lastChild;
    if (collection) {
      for (const n of v) {
        req.body.name = n;
        await coinController.putNewCoinInEntity(req, res); //args - name
        const coinObj = responseBody.to(); //CoinDTO obj
        const coinEntity = coinObj.entity.cloneNode(true);
        coinEntity.hidden = false;
        coinEntity.dataset.location = k;
        collection.append(coinEntity);
      }
    }
    await headerController.putNewCountInBadge(req, res); //args -  header.collection
  }
  document.body.children["usmap"].style.cursor = "default";
};
