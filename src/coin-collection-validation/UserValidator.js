import { ValidationError } from "../coin-collection-exception/CoinCollectionError.js";

export class UserValidator {
  static validateUserInput(input) {
    const confirm = input.form.confirm;
    input.interacted =
      confirm?.matches(":user-valid") || confirm?.matches(":user-invalid");
    const router = {
      email: () => UserValidator.validateUserEmail(input),
      password: () => UserValidator.validateUserPassword(input),
      confirm: () => UserValidator.validatePasswordMatch(input),
    };
    return router[input.id]();
  }
  static validateUserEmail(input) {
    const isValid = input.checkValidity();
    if (!isValid) {
      input.disable();
      input.setCustomValidity(
        "Enter a valid email address (e.g., name@domain.com).",
      );
      throw new ValidationError({
        target: input,
        message: { emailMsg: input.validationMessage },
        name: "ValidationError",
        operation: "validateUserEmail",
      });
    }
  }
  static validateUserPassword(input) {
    const message = {};
    const confirm = input.form.confirm;
    const match = confirm?.value === input.value;
    const isValid = input.checkValidity();
    if (!isValid) {
      input.disable();
      input.setCustomValidity(
        "Password needs 8+ chars, upper, lower, number ⚠️",
      );
      message.passwordMsg = input.validationMessage;
      if (confirm?.interacted && !match) {
        confirm.setCustomValidity("Passwords do not match ⚠️");
        message.confirmMsg = confirm.validationMessage;
      }
      throw new ValidationError({
        target: input,
        message,
        name: "ValidationError",
        operation: "validateUserPassword",
      });
    }
    return confirm;
  }
  static validatePasswordMatch(input) {
    input.interacted = true;
    const password = input.form.password;
    const isValid = password.value === input.value;
    input.setCustomValidity(!isValid ? "Passwords do not match ⚠️" : "");
    if (!isValid) {
      input.disable();
      throw new ValidationError({
        target: input,
        message: { confirmMsg: input.validationMessage },
        name: "ValidationError",
        operation: "validatePasswordMatch",
      });
    }
  }
}
