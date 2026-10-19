import { Application } from "../src/Application.js";
// import { EventRegister } from "../src/EventRegister.js";

export const handler = async (e) => {
  let responseBody;
  const id = e.target.id;
  const form = e.target.form;
  const req = { body: { input: e.target, button: form["authenticate"] } };
  const res = { obj: (data) => (responseBody = data) };
  const authController = Application.controllers.authController;
  const router = {
    pin: async () => {
      await authController.getPinInputValidation(req, res);
      responseBody?.message.toSpan()
    },
    email: async () => {
      await authController.getEmailInputValidation(req, res);
      responseBody?.message.toSpan()
    },
    password: async () => {
      await authController.getPasswordInputValidation(req, res);
      responseBody?.message.toSpan()
    },
    confirm: async () => {
      await authController.getPasswordMatchValidation(req, res);
      responseBody?.message.toSpan()
    },
  };
  await router[id]();
};
