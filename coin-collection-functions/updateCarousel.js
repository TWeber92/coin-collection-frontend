import { EventRegister } from "../src/EventRegister";

export const updateCarousel = (e) => {
  let responseBody;
  const option = e.target.dataset.option;
  const carouselNavController = EventRegister.controllers.carouselNavController;
  const slideController = EventRegister.controllers.slideController;
  const req = { body: { index } };
  const res = { obj: (data) => (responseBody = data) };
  const router = {
    prev: () => carouselNavController.getPrevIndex(res),
    next: () => carouselNavController.getNextIndex(res),
    dot: () => carouselNavController.getDotIndex(res),
    selected: () => carouselNavController.getSelectedIndex(res),
  };
  router[option]();
  req.body.index = responseBody;
  slideController.putSlideInPosition(req);
};
