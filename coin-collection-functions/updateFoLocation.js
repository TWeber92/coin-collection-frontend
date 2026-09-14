import { EventRegister } from "../src/EventRegister.js";

export const handler = async (e) => {
  if (window.matchMedia("(max-width: 768px)").matches) return;
  const fo = e.target.closest("foreignObject");
  const usMapController = EventRegister.controllers.usMapController;
  const req = { body: { fo } };
  const router = {
    mouseover: async () => await usMapController.putFOLast(req, null),
    mouseout: async () => await usMapController.putFOBack(req, null),
  };
  await router[e.type]();
};
