import { EventRegister } from "../src/EventRegister.js";

export const handler = async (e) => {
  let responseBody;
  const action = e.target.dataset.action;
  const value = e.target.value;
  const mq = document.dataset.mq;
  const collectionController = EventRegister.controllers.collectionController;
  const coinController = EventRegister.controllers.coinController;
  const usMapController = EventRegister.controllers.usMapController;
  const headerController = EventRegister.controllers.headerController;
  const res = { obj: (data) => (responseBody = data) };
  const req = { body: { action } };
  await coinController.getCoinState(req, res);
  req.body.coin = responseBody;
  const route = `${action}:${value}`;
  const postCoinToMap = () => usMapController.putCoinInForeignObj(req, res);
  const updateMap = {
    "add:coin": async () => {
      if (!mq) postCoinToMap();
      return await collectionController.postFavoriteToCollection(req, res);
    },
    "archive:coin": async () =>
      await collectionController.postToArchiveCollection(req, null),
    "restore:coin": async () => {
      if (!mq) postCoinToMap();
      return await collectionController.putArchivedInFavoriteCollection(
        req,
        null,
      );
    },
    "delete:coin": async () =>
      await collectionController.deleteCoinFromCollection(req, null),
  };
  await updateMap[route]();
  await headerController.updateMenuCounters(req, null);
};
