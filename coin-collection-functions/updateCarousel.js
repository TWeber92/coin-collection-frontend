import { EventRegister } from "../src/EventRegister.js";

export const handler = async (e) => {
  let responseBody;
  const option = e.target.dataset.option;
  const carouselController = EventRegister.controllers.carouselController;
  const usMapController = EventRegister.controllers.usMapController;
  const res = { obj: (data) => (responseBody = data) };
  const router = {
    prev: async () =>
      await carouselController.postPreviousStateSlide(null, null),
    next: async () => await carouselController.postNextStateSlide(null, null),
  };
  await usMapController.putStatesBackInMap();
  await router[option]();
  await usMapController.getCarouselPathsByIndex(null, res);
  const req = { body: { ...responseBody } };
  await carouselController.putSlidesInPosition(req, null);
};
