import { Application } from "../src/Application.js";
// import { EventRegister } from "../src/EventRegister.js";

export const handler = async (e) => {
  let responseBody;
  const { coinController } = Application.controllers;
  const req = {body: {coin: e.target}}
  const res = {obj: (data) => responseBody = data}
  await coinController.putSelectedCoinInEntity(req, res); //args - coin
  
};
