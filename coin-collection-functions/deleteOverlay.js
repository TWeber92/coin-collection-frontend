import { Application } from "../src/Application.js";
// import { EventRegister } from "../src/EventRegister.js";

export const handler = async (e) => {
  let responseBody;
  const { coinController } = Application.controllers;
  const req = { body: { clone: false } };
  const res = { obj: (data) => (responseBody = data) };
  await coinController.getSelectedCoinEntity(req, res); //args - clone *note that
  req.body.coin = responseBody.to();
  if (req.body.coin.entity?.children["coined"])
    await coinController.deletePartOfCoinId(req, res);
  const overlay = e.target.closest("#overlay");
  if (overlay) {
    overlay.hidden = true;
    document.body.dataset.overlay = "false";
  }
};
