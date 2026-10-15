import { Application } from "../src/Application.js";
// import { EventRegister } from "../src/EventRegister.js";

export const handler = async (e) => {
  let responseBody;
  const { tooltipController, coinController } = Application.controllers;
  const req = {
    body: { relative: e.relatedTarget, tooltip: e.target, clone: false },
  };
  const restore = req.body.tooltip.previousSibling;
  const del = req.body.tooltip.nextSibling;
  const wrapper = req.body.tooltip.parentNode;
  const allowed = (restore || del) && !wrapper.contains(req.body.relative);
  const res = { obj: (data) => (responseBody = data) };
  if (allowed || (!restore && !del)) {
    await coinController.getSelectedCoinEntity(req, res); //args - clone
    req.body.coin = responseBody.to(); // coinDTO obj
    if (req.body.coin.entity?.children["coined"])
      await coinController.deletePartOfCoinId(req, res);
    await tooltipController.deleteTooltip(req, res); //args relative, tooltip, clone
  }
};
