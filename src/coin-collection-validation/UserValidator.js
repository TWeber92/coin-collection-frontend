import { ValidationError } from "../coin-collection-exception/CoinCollectionError";

export class UserValidator {
  static validateUserInput(input) {
    const router = {
      email: () => UserValidator.validateUserEmail(input),
      password: () => UserValidator.validateUserPassword(input),
    };
    return router[input.type]();
  }
  static validateUserEmail(input) {
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    const isValid = emailRegex.test(input.value);
    if (!isValid) {
      input.dataset.valid = "false";
      throw new ValidationError({
        target: input.nextElementSibling,
        message: "Invalid email",
        name: "input",
        operation: "validateUserEmail",
      });
    }
    input.dataset.valid = "true";
    return true;
  }
  static validateUserPassword(input) {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const isValid = passwordRegex.test(input.value);
    if (!isValid) {
      input.dataset.valid = "false";
      throw new ValidationError({
        target: input.nextElementSibling,
        message: "Password needs 8+ chars, upper, lower, number",
        name: "input",
        operation: "validateUserPassword",
      });
    }
    input.dataset.valid = "true";
    return true;
  }
}
