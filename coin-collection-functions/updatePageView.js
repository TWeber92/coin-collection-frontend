import { EventRegister } from "../src/EventRegister";

export const handler = async (e) => {
  let responseBody;
  const id = e.target.id;
  const location = e.target.dataset.location;
  const collectionController = EventRegister.controllers.collectionController;
  const headerController = EventRegister.controllers.headerController;
  const pageController = EventRegister.controllers.pageController;
  const req = { body: { id } };
  const res = { obj: (data) => (responseBody = data) };
  await collectionController.getCollectionById(req, res);
  req.body.collection = responseBody;
  const router = {
    favorites: async () => await pageController.putFavoritesOnPage(req, null),
    archived: async () => await pageController.putArchiveOnPage(req, null),
  };
  await router[id]();
  if (location === "menu") await headerController.updateMenuView(req, res);
  await collectionController.putCollectionOnOrOffDisplay(req, res);
};
