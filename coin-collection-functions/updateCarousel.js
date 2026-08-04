import { EventRegister } from "../src/EventRegister";

export const updateCarousel = async (e) => {
  let responseBody;
  const option = e.target.dataset.option;
  const carouselController = EventRegister.controllers.carouselController;
  const usMapController = EventRegister.controllers.usMapController;
  const res = { obj: (data) => (responseBody = data) };
  const router = {
    prev: async () => await carouselController.updatePrevIndex(null, null),
    next: async () => await carouselController.updateNextIndex(null, null),
  };
  await usMapController.putStatesBackInMap();
  await router[option]();
  await usMapController.getCarouselPathsByIndex(null, res);
  const req = { body: { entity: responseBody } };
  await carouselController.putSlidesInPosition(req, null);
};
