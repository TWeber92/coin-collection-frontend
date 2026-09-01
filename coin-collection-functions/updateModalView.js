import { EventRegister } from "../src/EventRegister.js";

export const handler = async (e) => {
  let responseBody;
  const req = {
    body: {
      name: e.target.dataset.name,
      menuId: "hamburger",
      id: e.target.id,
    },
  };
  const res = { obj: (data) => (responseBody = data) };
  const navIsOpen = !document.body.querySelector("#nav-menu").hidden;
  const modalController = EventRegister.controllers.modalController;
  const headerController = EventRegister.controllers.headerController;
  const collectionController = EventRegister.controllers.collectionController;
  const coinController = EventRegister.controllers.coinController;
  const id = e.target.id;
  if (id === "state") {
    // await collectionController.getFavoritesList(null, res);
    // req.body.favorites = responseBody;
    await coinController.updateCoinEntity(req, res);
    req.body = { ...req.body, ...responseBody }; //{ name: e.target.dataset.name, favorites, coin, year, collectedId }
  }
  const router = {
    state: async () => await modalController.postStateModalContext(req, null),
    login: async () => await modalController.postLoginModalContext(req, null),
    signup: async () => await modalController.postSignUpModalContext(req, null),
  };
  await router[id]();
  if (navIsOpen) headerController.putMenuNavOnOffDisplay(req, res);
};
