import { EventRegister } from "../src/EventRegister.js";

export const handler = async (e) => {
  let responseBody;
  const action = e.target.dataset.action;
  const value = e.target.value;
  const mq = window.matchMedia("(max-width: 768px)").matches;
  const collectionController = EventRegister.controllers.collectionController;
  const coinController = EventRegister.controllers.coinController;
  const tooltipController = EventRegister.controllers.tooltipController;
  const usMapController = EventRegister.controllers.usMapController;
  const headerController = EventRegister.controllers.headerController;
  const modalController = EventRegister.controllers.modalController;
  const pageController = EventRegister.controllers.pageController;
  const route = `${action}:${value}`;
  const res = { obj: (data) => (responseBody = data) };
  const req = {
    body: {
      tooltip: e.target,
      clone: action === "add",
      favoritesId: "favorites",
      archiveId: "archive",
      badgeId: "badge",
      menuId: "menu",
    },
  };
  await tooltipController.deleteTooltip(req, null);
  await coinController.getUpdatedCoinState(req, res);
  req.body.coin = responseBody.coin;
  await collectionController.getCoinFromArchiveCollection(req, res);
  if (responseBody) req.body.coin = responseBody;
  const postCoinToMap = async () =>
    await usMapController.putCoinInForeignObj(req, res);
  const updateMap = {
    "add:coin": async () => {
      await collectionController.postToFavoritesCollection(req, res);
      if (!mq) await postCoinToMap();
      await collectionController.getCollectedFavoriteNames(req, res);
      req.body.favorites = responseBody;
      delete req.body.coin;
      await modalController.postStateModalContext(req, res);
    },
    "archive:coin": async () => {
      await collectionController.putFavoriteInArchiveCollection(req, res);
      await headerController.putNewCountInBadge(req, res);
      req.body.button = responseBody;
      req.body.collectionId = req.body.archiveId;
      await collectionController.getCollectionById(req, res);
      req.body.collection = responseBody.collection;
      if (mq) await pageController.putArchiveOnPage(req, res);
    },

    "restore:coin": async () => {
      await collectionController.putArchivedInFavoritesCollection(req, null);
      if (!mq) await postCoinToMap();
    },
    "delete:coin": async () =>
      await collectionController.deleteArchivedFromCollection(req, res),
  };
  await updateMap[route]();
  if (action !== "archive") await headerController.putNewCountInBadge(req, res);
};
