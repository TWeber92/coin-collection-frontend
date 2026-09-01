import { EventRegister } from "../src/EventRegister.js";

export const handler = async (e) => {
  console.log(e.target);
  console.log(e.type);

  const id = e.target.id;
  const req = { body: { e, input: e.target, button: "authenticate" } };
  const authController = EventRegister.controllers.authController;
  const router = {
    email: async () => await authController.getEmailInputValidation(req, null),
    password: async () =>
      await authController.getPasswordInputValidation(req, null),
    confirm: () => authController.getPasswordMatchValidation(req, null),
  };
  await router[id]();
};
