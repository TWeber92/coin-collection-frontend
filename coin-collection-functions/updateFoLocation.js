import { Application } from "../src/Application.js";
// import { EventRegister } from "../src/EventRegister.js";
export const handler = async (e) => {
  let responseBody;
  if (window.matchMedia("(max-width: 768px)").matches) return;
  const fo = e.target;
  const mouse = fo.dataset.mouse;
  const usMapController = Application.controllers.usMapController;
  const req = { body: { fo } };
  const res = { obj: (data) => (responseBody = data) };
  const router = {
    out: async () => {
      await usMapController.putFOLast(req, res);
      fo.dataset.mouse = "over";
    },
    over: async () => await usMapController.putFOBack(req, res),
  };
  if (router[mouse]) await router[mouse]();
};
