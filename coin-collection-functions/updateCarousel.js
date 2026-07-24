import { EventRegister } from "../src/EventRegister";

export const updateCarousel = (e) => {
  let responseBody;
  const option = e.target.dataset.option;
  const carouselNavController = EventRegister.controllers.carouselNavController;
  const slideController = EventRegister.controllers.slideController;
  const req = { body: { index } };
  const res = { obj: (data) => (responseBody = data) };
  const router = {
    prev: () => carouselNavController.getPrevIndex(null, res),
    next: () => carouselNavController.getNextIndex(null, res),
    dot: () => carouselNavController.getDotIndex(null, res),
    selected: () => carouselNavController.getSelectedIndex(null, res),
  };
  router[option]();
  req.body.index = responseBody;
  slideController.putSlideInPosition(req, null);
};
