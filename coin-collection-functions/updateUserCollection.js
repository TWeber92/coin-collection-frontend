import { EventRegister } from "../src/EventRegister.js";

export const handler = (e) => {
  let requestBody;
  const action = e.target.dataset.action;
  const value = e.target.value;
  const collectionController = EventRegister.controllers.collectionController;
  const coinController = EventRegister.controllers.coinController;
  const USMapController = EventRegister.controllers.usMapController;
  const menuController = EventRegister.controllers.menuController;
  const scrollController = EventRegister.controllers.scrollController;
  const sortController = EventRegister.controllers.sortController;
  const res = { node: (data) => (requestBody = data) };
  coinController.getCoinState(res);
  const req = { body: { coin: responseBody } };
  collectionController.postToUserCollection(req, res);
  const route = `${action}:${value}`;
  const updateMap = {
    "add:coin": () =>
      collectionController.postFavoriteToCollection(req.body, action),
    "archive:coin": () =>
      collectionController.putFavoriteInRemovedCollection(req.body, action),
    "restore:coin": () =>
      collectionController.putRemovedInFavoriteCollection(req.body, action),
    "delete:coin": () =>
      collectionController.deleteCoinFromUserCollection(req.body, action),
  };
  updateMap[route]();
  const data = responseBody;
  if (!data.inserted) USMapController.postCoinInForeignObj(data.coin);
  const { favorites, removed } = data;
  collectionController.deleteCollectionControls(favorites, removed);
  menuController.updateMenuCounters({ favorites, removed });
  [(favorites, removed)].forEach(({ container, show }) => {
    if (show && container) {
      scrollController.updateScrollArrowState({ container, show });
      sortController.postSortTools({ container });
    }
  });
};
