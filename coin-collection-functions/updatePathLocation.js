import { Application } from "../src/Application.js";
// import { EventRegister } from "../src/EventRegister.js";

export const handler = async (e) => {
  if (window.matchMedia("(max-width: 768px)").matches) return;
  let responseBody;
  const path = e.target;
  const mouse = path.dataset.mouse;
  const usMapController = Application.controllers.usMapController;
  const req = { body: { path } };
  const res = { obj: (data) => (responseBody = data) };
  const router = {
    out: async () => {
      path.dataset.mouse = "over";
      await usMapController.putPathLast(req, res); //args - path
    },
    over: async () => await usMapController.putPathBack(req, res), //args - path
  };
  await router[mouse]();
};
