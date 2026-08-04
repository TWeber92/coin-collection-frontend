import { EventRegister } from "../src/EventRegister";

export const handler = async (e) => {
  const id = e.target.id;
  const headerController = EventRegister.controllers.headerController;
  const req = { body: { id } };
  await headerController.updateMenuView(null, null);
};
