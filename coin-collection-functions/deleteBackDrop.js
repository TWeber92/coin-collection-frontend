import { Application } from "../src/Application.js";
// import { EventRegister } from "../src/EventRegister.js";

export const handler = async (e) => {
  let responseBody;
  const { coinController, headerController } = Application.controllers;
  const overlay = document.body.querySelector("#overlay:not([hidden])");
  const req = { body: { clone: false } };
  const res = { obj: (data) => (responseBody = data) };
  await coinController.getSelectedCoinEntity(req, res); //args - clone *note that
  req.body.coin = responseBody.to();
  if (req.body.coin.entity?.children["coined"])
    await coinController.deletePartOfCoinId(req, res);
  await headerController.getHeaderContext(req, res);
  req.body.header = responseBody.to(); //HeaderDTO obj
  req.body.menuBtn = req.body.header.hamburger;
  const navIsOpen = !req.body.header.mobile.hidden;
  if (navIsOpen) await headerController.putMenuNavOnOffDisplay(req, res); //args - menuBtn
  if (overlay) overlay.hidden = true;
  document.body.dataset.overlay = "false";
};
