import { EventRegister } from "../src/EventRegister.js";

export const handler = async (e) => {
  const mouse = e.target.dataset.mouse;
  const usMapController = EventRegister.usMapController;
  const req = { body: { fo: e.target } };
  const router = {
    over: async () => await usMapController.putFOLast(req, null),
    out: async () => await usMapController.putFOBack(req, null),
  };
  await router[mouse]();
};
