import { Application } from "../src/Application.js";
// import { EventRegister } from "../src/EventRegister.js";

export const handler = async (e) => {
  document.body.style.cursor = "wait";
  e.target.style.cursor = "wait";
  let responseBody;
  const req = {
    body: {
      name: e.target.dataset.name || e.target.name,
      id: e.target.id,
    },
  };
  const id = e.target.id;
  const res = { obj: (data) => (responseBody = data) };
  const {
    modalController,
    collectionController,
    coinController,
    headerController,
    pageController,
  } = Application.controllers;

  await headerController.getHeaderContext(req, res); //args - none
  req.body.header = responseBody.to(); //HeaderDTO obj
  const navIsOpen = !req.body.header.mobile.hidden;
  req.body.menuBtn = req.body.header.hamburger;
  req.body.favoritesId = req.body.header.buttons.favorites.id;

  if (id === "state") {
    await collectionController.getCollectionsById(req, res); //args - favoritesId
    req.body.collection = responseBody.to(); // CollectionDTO obj
    req.body.user = req.body.collection.user;
    await coinController.putNewCoinInEntity(req, res); //args - name;
    req.body.coin = responseBody.to(); //CoinDTO obj
  }
  const router = {
    password: async () => {
      await modalController.postEmailStageContext(req, null); //args - id, name
      await pageController.deletePageFromDisplay(req, res); //args - none
    },
    state: async () => await modalController.postStateModalContext(req, null), //args - coin, name, user.collection.favorites,
    login: async () => await modalController.postLoginModalContext(req, null), //args - id
    signup: async () => await modalController.postSignUpModalContext(req, null), //args - id
  };
  if (navIsOpen) headerController.putMenuNavOnOffDisplay(req, res); //args - header.hamburger

  await router[id]();

  document.body.style.cursor = "default";
  e.target.style.cursor = "pointer";
};
