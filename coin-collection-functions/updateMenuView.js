import { EventRegister } from "../src/EventRegister";

export const handler = (e) => {
  const id = e.target.dataset.id;
  const menuController = EventRegister.controllers.menuController;
  const collectionController = EventRegister.controllers.collectionController;
  const modalController = EventRegister.controllers.modalController;
  const req = { body: { id } };
  const router = {
    hamburger: () => menuController.updateMenu(null, null),
    favorites: () => collectionController.putFavoritesOnPage(req, null),
    archived: () => collectionController.putArchivedOnPage(req, null),
    login: () => modalController.postLoginModal(req, null),
  };
  router[id]();
  if (id !== "hamburger") menuController.updateMenu(null, null);
};
