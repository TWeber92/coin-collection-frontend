import { EventRegister } from "../src/EventRegister";

export const handler = async (e) => {
  let responseBody;
  const req = { body: { name: e.target.dataset.name } };
  const res = { obj: (data) => (responseBody = data) };
  const modalController = EventRegister.modalController;
  const coinController = EventRegister.coinController;
  const id = e.target.id;
  if (id === "state") await coinController.updateCoinElement(req, res);
  req.body.coin = responseBody;
  const router = {
    state: () => modalController.postStateModal(req),
    login: () => modalController.postLoginModal(req),
    signup: () => modalController.postSignUpModal(req),
  };
  router[id]();
};
