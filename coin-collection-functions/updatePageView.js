import { EventRegister } from "../src/EventRegister.js";

export const handler = async (e) => {
  let responseBody;
  const collectionId = e.target.id;
  const navIsOpen = !document.body.querySelector("#nav-menu").hidden;
  const collectionController = EventRegister.controllers.collectionController;
  const headerController = EventRegister.controllers.headerController;
  const pageController = EventRegister.controllers.pageController;
  const req = { body: { menuId: "hamburger", collectionId } };
  const res = { obj: (data) => (responseBody = data) };
  await collectionController.getCollectionById(req, res);
  req.body.collection = responseBody.collection;
  if (navIsOpen) headerController.putMenuNavOnOffDisplay(req, res);
  const router = {
    favorites: async () => await pageController.putFavoritesOnPage(req, res),
    archived: async () => await pageController.putArchiveOnPage(req, res),
  };
  await router[collectionId]();
  if (!responseBody)
    await collectionController.putCollectionOnOrOffDisplay(req, res);
};
