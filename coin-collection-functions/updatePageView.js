import { Application } from "../src/Application.js";
// import { EventRegister } from "../src/EventRegister.js";

export const handler = async (e) => {
  let responseBody;
  const selectedId = e.target.id;
  const { collectionController, pageController, headerController, authController } =
    Application.controllers;
  const req = { body: { button: e.target, selectedId } };
  const res = { obj: (data) => (responseBody = data) };
  await headerController.getHeaderContext(req, res);
  req.body.header = responseBody.to(); //HeaderDTO obj
  const navIsOpen = !req.body.header.mobile.hidden;
  req.body.menuBtn = req.body.header.hamburger;
  req.body.favoritesId = req.body.header.buttons.favorites.id;
  req.body.archiveId = req.body.header.buttons.archive?.id;
  await collectionController.getCollectionsById(req, res); //args - favoritesId, archiveId
  req.body.collection = responseBody.to(); //CollectionDTO obj

  if (navIsOpen) await headerController.putMenuNavOnOffDisplay(req, res); //args - header.hamburger
  const router = {
    email: async () => {
      await pageController.getEmailNotice(req,res)//args button
      responseBody.toToast()
    },
    logout: async () => {
      await pageController.deletePageFromDisplay(req, res)//args none
      await authController.logout(req, res)//args - none
      responseBody.toToast()
      await authController.getMe(req, res)//args - none
      req.body.user = responseBody.to()
      await headerController.deleteAboutHeaderButton(req, res)//args - user
    },
    about: async () => {
      await authController.getMe(req, res)// args - none
      req.body.user = responseBody.to()
      await pageController.putAboutOnPage(req, res)//args - user
    },
    favorites: async () => {
      await pageController.putFavoritesOnPage(req, res); //args - collection.favorites, collection.archive, favoritesId, archiveId
      req.body.page = responseBody.to()
      await collectionController.putCollectionOnOrOffPage(req, res); //args - collection, selectedId
    },
    archive: async () => {
      await pageController.putArchiveOnPage(req, res); //args - collection.favorites, collection.archive, favoritesId, archiveId
      req.body.page = responseBody.to()
      await collectionController.putCollectionOnOrOffPage(req, res); //args - collection, selectedId, page
      req.body.header.collection = req.body.collection.header.collection;
      await pageController.putFooterContentsOnOffPage(req, res); //args - button.id, header.collection.archive (count), collection.archive
    },
    scrollable: async () =>
      await pageController.putArchiveInNewPosition(req, res), //args - button, collection.archive
  };
  await router[selectedId]();
};
