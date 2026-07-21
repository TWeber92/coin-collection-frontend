import { EventRegister } from "../src/EventRegister";
import { ToolTipTemplates } from "../src/ui/tool-tip/ToolTipTemplates";

export const handler = (e) => {
  const { usmap, modal, favorites, archived } =
    ToolTipTemplates.getToolTipTemplates();
  let responseBody;
  const location = e.target.dataset.location;
  const tooltipController = EventRegister.controllers.tooltipController;
  const coinController = EventRegister.controllers.coinController;
  const req = { body: { coin: e.target } };
  coinController.updateCoinState(req);
  const router = {
    usmap: usmap,
    modal: modal,
    favorites: favorites,
    archived: archived,
  };
  req.body.html = router[location]();
  tooltipController.updateTooltipHtml(req);
};
