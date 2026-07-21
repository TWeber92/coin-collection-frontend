import { EventRegister } from "../src/EventRegister";

export const handler = (e) => {
  const transition = EventRegister.transition;
  if (transition) {
    transition();
    EventRegister.transition = null;
    return;
  }
  const mouse = e.target.dataset.mouse;
  const usMapController = EventRegister.usMapController;
  const req = {
    body: { fo: e.target, event: EventRegister },
  };
  const router = {
    over: () => usMapController.putFOLast(req),
    out: () => usMapController.putFOBack(req),
  };
  router[mouse]();
};
