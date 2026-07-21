import { EventRegister } from "../src/EventRegister";

export const handler = (e) => {
  const field = e.target.dataset.field;
  const authController = EventRegister.controllers.authController;
  const req = { body: { value: e.target.value } };
  const router = {
    email: () => authController.updateEmail(req),
    password: () => authController.updatePassword(req),
  };
  router[field]();
};
