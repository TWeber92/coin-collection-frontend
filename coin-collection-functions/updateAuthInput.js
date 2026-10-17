import { Application } from "../src/Application.js";
// import { EventRegister } from "../src/EventRegister.js";

export const handler = async (e) => {
  const id = e.target.id;
  const form = e.target.form;
  const req = { body: { input: e.target, button: form["authenticate"] } };
  const authController = Application.controllers.authController;
  const router = {
    pin: async () => await authController.getPinInputValidation(req, null),
    email: async () => await authController.getEmailInputValidation(req, null),
    password: async () =>
      await authController.getPasswordInputValidation(req, null),
    confirm: async () =>
      await authController.getPasswordMatchValidation(req, null),
  };
  await router[id]();
};
