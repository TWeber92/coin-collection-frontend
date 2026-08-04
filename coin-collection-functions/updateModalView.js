import { EventRegister } from "../src/EventRegister";

export const handler = async (e) => {
  let responseBody;
  const req = { body: { name: e.target.dataset.name } };
  const res = { obj: (data) => (responseBody = data) };
  const modalController = EventRegister.controllers.modalController;
  const collectionController = EventRegister.controllers.collectionController;
  const coinController = EventRegister.controllers.coinController;
  const id = e.target.id;
  await collectionController.getFavoritesList(null, res);
  req.body.favorites = responseBody;
  if (id === "state") await coinController.updateCoinElement(req, res);
  req.body = { ...req.body, ...responseBody }; //{ name: e.target.dataset.name, favorites, coin, year } };
  const router = {
    state: async () => await modalController.postStateModal(req, null),
    login: async () => await modalController.postLoginModal(req, null),
    signup: async () => await modalController.postSignUpModal(req, null),
  };
  await router[id]();
};
