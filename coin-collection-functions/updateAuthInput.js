import { EventRegister } from "../src/EventRegister";

export const handler = async (e) => {
  const field = e.target.dataset.field;
  const authController = EventRegister.controllers.authController;
  const req = { body: { value: e.target.value } };
  const router = {
    email: async () => await authController.updateEmail(req, null),
    password: async () => await authController.updatePassword(req, null),
  };
  await router[field]();
};
