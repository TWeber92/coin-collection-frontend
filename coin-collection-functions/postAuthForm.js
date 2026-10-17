import { Application } from "../src/Application.js";
// import { EventRegister } from "../src/EventRegister.js";

export const handler = async (e) => {
  let responseBody;
  const form = e.target;
  console.log(form);
  const { email, pin, password } = Object.fromEntries(new FormData(e.target));
  const { authController, modalController } = Application.controllers;
  const req = { body: { name: form.id, email, password, pin } };
  const res = { obj: (data) => (responseBody = data) };
  const router = {
    reset: async () => {
      await authController.getPin(req, res); //args- email
      req.body.message = responseBody.message;
      await modalController.postPinStageContext(req, res); //args = message
    }, //args - name
    pin: async () => await modalController.postResetStageContext(req, res), //args - name
    login: async () => await authController.postLoginForm(req, res),
    signup: async () => await authController.postSignUpForm(req, res),
    password: async () => {
      await authController.postPasswordResetForm(req, res);
      responseBody.message.toToast();
      await modalController.deleteModalFromDisplay(req, res)//args - none
    },
  };
  await router[form.id]();
};
