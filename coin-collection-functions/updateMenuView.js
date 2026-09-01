import { EventRegister } from "../src/EventRegister.js";

export const handler = async (e) => {
  const menuId = e.target.id;
  const headerController = EventRegister.controllers.headerController;
  const req = { body: { menuId } };
  await headerController.putNewIconInHeader(req, null);
};
