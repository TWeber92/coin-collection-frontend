import { EventRegister } from "../src/EventRegister";

export const handler = (e) => {
  const id = e.target.dataset.id;
  const menuController = EventRegister.controllers.menuController;
  const collectionController = EventRegister.controllers.collectionController;
  const modalController = EventRegister.controllers.modalController;
  const req = { body: { id } };
  const router = {
    hamburger: () => menuController.updateMenu(),
    favorites: () => collectionController.updateFavorites(req),
    archived: () => collectionController.updateArchived(req),
    login: () => modalController.postLoginModal(req),
  };
  router[id]();
  if (id !== "hamburger") menuController.updateMenu();
};
