import { EventRegister } from "../src/EventRegister.js";

export const handler = async (e) => {
  const tooltipController = EventRegister.controllers.tooltipController;
  const req = { body: { e } };
  console.log(e);

  await tooltipController.deleteTooltip(req, null);
};
