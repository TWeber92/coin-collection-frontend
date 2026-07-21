import { EventRegister } from "../src/EventRegister";

export const handler = async (e) => {
  const form = e.target.closest("form");
  const formData = new FormData(form);
  const email = formData.get("email");
  const password = formData.get("password");
  const authController = EventRegister.controllers.authController;
  const req = { body: { email, password } };
  const router = {
    login: () => authController.postLoginForm(req),
    signup: () => authController.postSignUpForm(req),
  };
  router[form.id]();
};
