import { EventRegister } from "../src/EventRegister";
import { ToolTipTemplates } from "../src/ui/tool-tip/ToolTipTemplates";

export const handler = (e) => {
  let responseBody;
  const location = e.target.dataset.location;
  const tooltipController = EventRegister.controllers.tooltipController;
  const coinController = EventRegister.controllers.coinController;
  const coin = location === "modal" ? e.target.cloneNode(true) : e.target;
  const req = { body: { coin, location, e } };
  coinController.updateCoinState(req, null);
  req.body = responseBody;
  const router = {
    usmap: () => tooltipController.postArchiveTooltip(req, null),
    modal: () => tooltipController.postAddTooltip(req, null),
    favorites: () => tooltipController.postArchiveTooltip(req, null),
    archived: () => tooltipController.postRestoreOrDeleteTooltip(req, null),
  };
  router[location]();
};
