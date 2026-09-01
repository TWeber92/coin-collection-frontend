import { EventRegister } from "../src/EventRegister.js";

export const handler = async (e) => {
  const mouse = e.target.dataset.mouse;
  const usMapController = EventRegister.controllers.usMapController;
  const req = { body: { path: e.target } };
  const router = {
    over: async () => await usMapController.putPathLast(req, null),
    out: async () => await usMapController.putPathBack(req, null),
  };
  await router[mouse]();
};
