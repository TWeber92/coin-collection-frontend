import { EventRegister } from "../src/EventRegister";
import { ToolTipTemplates } from "../src/ui/tool-tip/ToolTipTemplates";

export const handler = async (e) => {
  let responseBody;
  const location = e.target.closest("#fo, #modal, #favorites, #archive").id;
  const tooltipController = EventRegister.controllers.tooltipController;
  const coinController = EventRegister.controllers.coinController;
  // const coin = location === "modal" ? e.target.cloneNode(true) : e.target;
  const req = { body: { coin: e.target, location } };
  await coinController.updateCoinState(req, null);
  const router = {
    fo: async () => await tooltipController.postArchiveTooltip(req, null),
    modal: async () => await tooltipController.postAddTooltip(req, null),
    favorites: async () =>
      await tooltipController.postArchiveTooltip(req, null),
    archived: async () =>
      await tooltipController.postRestoreOrDeleteTooltip(req, null),
  };
  await router[location]();
};
