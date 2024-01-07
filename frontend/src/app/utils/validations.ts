export const emailValidate = {
  required: "⚠ Required field",
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "⚠ Invalid email address",
  },
};

export const passwordValidate = {
  required: "⚠ Required field",
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/,
    message:
      "⚠ Password must contain an uppercase letter, a lowercase letter, a digit, a special character, and be 8-20 characters long.",
  },
};