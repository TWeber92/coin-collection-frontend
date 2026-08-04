import { EventRegister } from "../src/EventRegister";

export const handler = async (e) => {
  const tooltipController = EventRegister.tooltipController;
  const req = { body: { coin: e.target } };
  await tooltipController.deleteTooltip(req, null);
};
