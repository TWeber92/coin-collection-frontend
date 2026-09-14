import { EventRegister } from "../src/EventRegister.js";

export const handler = async (e) => {
  if (window.matchMedia("(max-width: 768px)").matches) return;
  let responseBody;
  const usMapController = EventRegister.controllers.usMapController;
  const req = { body: { path: e.target } };
  const res = { obj: (data) => (responseBody = data) };
  const router = {
    mouseover: async () => await usMapController.putPathLast(req, res),
    mouseout: async () => await usMapController.putPathBack(req, res),
  };
  await router[e.type]();
};
