import { EventRegister } from "../src/EventRegister.js";

export const handler = async (e) => {
  const menuController = EventRegister.menuController;
  const backdrop = e.target.dataset.backdrop === "true";
  const overlays = [...document.querySelectorAll("#overlay")];
  const activeOverlay = overlays.find(
    (overlay) => overlay.dataset.active === "true",
  );
  const menu = document.querySelector("#menu");
  const activeMenu = menu.dataset.active === "true";
  if (activeMenu && backdrop && !activeOverlay)
    await menuController.updateMenu(null, null);
};
