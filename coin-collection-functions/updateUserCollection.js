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
  const req = { body: { coin: responseBody, action } };
  const route = `${action}:${value}`;
  const updateMap = {
    "add:coin": () => collectionController.postFavoriteToCollection(req, res),
    "archive:coin": () =>
      collectionController.putFavoriteInArchiveCollection(req),
    "restore:coin": () =>
      collectionController.putArchivedInFavoriteCollection(req, res),
    "delete:coin": () => collectionController.deleteCoinFromUserCollection(req),
  };
  updateMap[route]();
  const data = responseBody;
  if (!data.inserted) USMapController.postCoinInForeignObj(req);
  const { favorites, archive } = data;
  collectionController.deleteCollectionControls(favorites, archive);
  menuController.updateMenuCounters({ favorites, archive });
  [(favorites, archive)].forEach(({ container, show }) => {
    if (show && container) {
      scrollController.updateScrollArrowState({ container, show });
      sortController.postSortTools({ container });
    }
  });
};
