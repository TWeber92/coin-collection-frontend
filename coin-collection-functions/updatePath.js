import { EventRegister } from "../src/EventRegister";

export const handler = (e) => {
  const mouse = e.target.dataset.mouse;
  const usMapController = EventRegister.controllers.usMapController;
  const req = { body: { target: e.target } };
  const router = {
    over: () => usMapController.putPathLast(req, null),
    out: () => usMapController.putPathBack(req, null),
  };
  router[mouse]();
};
