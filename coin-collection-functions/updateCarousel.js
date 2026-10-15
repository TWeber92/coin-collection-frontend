import { Application } from "../src/Application.js";
// import { EventRegister } from "../src/EventRegister.js";

export const handler = async (e) => {
  let responseBody;
  const option = e.target.dataset.option;
  const { carouselController, usMapController } = Application.controllers;
  const req = { body: {} };
  const res = { obj: (data) => (responseBody = data) };
  const router = {
    prev: async () => await carouselController.postPreviousStateSlide(req, res),
    next: async () => await carouselController.postNextStateSlide(req, res),
  };
  await usMapController.putStatesBackInMap(req, res); //args - none
  await router[option]();
  req.body.carousel = responseBody.to(); //CarouselDTO obj
  await usMapController.getCarouselPathsByIndex(req, res); //args - carousel.index
  req.body.usmap = responseBody.to(); //UsMapDTO obj
  await carouselController.putSlidesInPosition(req, res); //args - usmap.navPaths
};
