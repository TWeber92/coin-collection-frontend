import { EventRegister } from "../src/EventRegister";

export const handler = (e) => {
  const tooltipController = EventRegister.tooltipController;
  const req = { body: { coin: e.target } };
  tooltipController.deleteTooltip(req, null);
};
