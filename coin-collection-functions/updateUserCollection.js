import { EventRegister } from "../src/EventRegister.js";

export const handler = async (e) => {
  console.log("hello?");
  let responseBody;
  const action = e.target.dataset.action;
  console.log(action);
  const value = e.target.value;
  const mq = window.matchMedia("(max-width: 768px)").matches;
  const collectionController = EventRegister.controllers.collectionController;
  const coinController = EventRegister.controllers.coinController;
  const usMapController = EventRegister.controllers.usMapController;
  const headerController = EventRegister.controllers.headerController;
  const route = `${action}:${value}`;
  const res = { obj: (data) => (responseBody = data) };
  const req = { body: { clone: action === "add", archiveId: "archive" } };
  await coinController.getUpdatedCoinState(req, res);
  req.body.coin = responseBody.coin;
  const postCoinToMap = () => usMapController.putCoinInForeignObj(req, res);
  const updateMap = {
    "add:coin": async () => {
      if (!mq) postCoinToMap();
      return await collectionController.postToFavoritesCollection(req, res);
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
