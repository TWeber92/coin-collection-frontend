import { EventRegister } from "../src/EventRegister.js";

export const handler = async (e) => {
  let responseBody;
  const location = e.target.closest("[data-location]").dataset.location;
  const tooltipController = EventRegister.controllers.tooltipController;
  const coinController = EventRegister.controllers.coinController;
  const req = { body: { e, coin: e.target, location } };
  await coinController.updateCoinEntityState(req, null);
  const router = {
    state: async () => await tooltipController.postArchiveTooltip(req, null),
    modal: async () => await tooltipController.postAddTooltip(req, null),
    favorites: async () =>
      await tooltipController.postArchiveTooltip(req, null),
    archive: async () =>
      await tooltipController.postRestoreOrDeleteTooltip(req, null),
  };
  await router[location]();
};
