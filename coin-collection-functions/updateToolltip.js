import { Application } from "../src/Application.js";
// import { EventRegister } from "../src/EventRegister.js";

export const handler = async (e) => {
  const location = e.target.closest("[data-location]").dataset.location;
  const { tooltipController } = Application.controllers;
  const req = { body: { e, coin: e.target, location } };
  const router = {
    state: async () => await tooltipController.postArchiveTooltip(req, null), //args - coin
    modal: async () => await tooltipController.postAddTooltip(req, null), //args - coin
    favorites: async () =>
      await tooltipController.postArchiveTooltip(req, null), //args - coin
    archive: async () =>
      await tooltipController.postRestoreOrDeleteTooltip(req, null), //args - coin
  };
  await router[location]();
};
