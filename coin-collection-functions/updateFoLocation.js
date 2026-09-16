import { EventRegister } from "../src/EventRegister.js";
export const handler = async (e) => {
  if (window.matchMedia("(max-width: 768px)").matches) return;
  const fo = e.target;
  const mouse = fo.dataset.mouse;
  const usMapController = EventRegister.controllers.usMapController;
  const req = { body: { fo } };
  const router = {
    out: async () => {
      fo.dataset.mouse = "over";
      await usMapController.putFOLast(req, null);
    },
    over: async () => await usMapController.putFOBack(req, null),
  };
  await router[mouse]();
};
