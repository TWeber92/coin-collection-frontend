import { EventRegister } from "../src/EventRegister.js";

export const handler = (e) => {
  let responseBody;
  const action = e.target.dataset.action;
  const value = e.target.value;
  const collectionController = EventRegister.controllers.collectionController;
  const coinController = EventRegister.controllers.coinController;
  const USMapController = EventRegister.controllers.usMapController;
  const menuController = EventRegister.controllers.menuController;
  const scrollController = EventRegister.controllers.scrollController;
  const sortController = EventRegister.controllers.sortController;
  const res = { node: (data) => (responseBody = data) };
  coinController.getCoinState(null, res);
  const req = { body: { coin: responseBody, action } };
  const route = `${action}:${value}`;
  const updateMap = {
    "add:coin": () => collectionController.postFavoriteToCollection(req, res),
    "archive:coin": () =>
      collectionController.putFavoriteInArchiveCollection(req, null),
    "restore:coin": () =>
      collectionController.putArchivedInFavoriteCollection(req, res),
    "delete:coin": () =>
      collectionController.deleteCoinFromUserCollection(req, null),
  };
  updateMap[route]();
  req.body = { ...req.body, responseBody }; //{count, containers, coin, inserted, action, show}
  if (!req.body.inserted) USMapController.postCoinInForeignObj(req, null);
  collectionController.deleteCollectionControls(req, null);
  menuController.updateMenuCounters(req, null);
  [(favorites, archive)].forEach(({ container, show }) => {
    if (show && container) {
      scrollController.updateScrollArrowState({ container, show });
      sortController.postSortTools({ container });
    }
  });
};
