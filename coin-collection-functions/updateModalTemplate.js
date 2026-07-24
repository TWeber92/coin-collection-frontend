import { EventRegister } from "../src/EventRegister";

export const handler = async (e) => {
  let responseBody;
  const req = { body: { entity: e.target } };
  const res = { obj: (data) => (responseBody = data) };
  const modalController = EventRegister.controllers.modalController;
  const coinController = EventRegister.controllers.coinController;
  const id = e.target.id;
  if (id === "state") await coinController.updateCoinElement(req, res);
  req.body.coin = responseBody;
  const router = {
    state: () => modalController.postStateModal(req, null),
    login: () => modalController.postLoginModal(req, null),
    signup: () => modalController.postSignUpModal(req, null),
  };
  router[id]();
};
