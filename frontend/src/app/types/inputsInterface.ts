import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export interface EmailInputInterface {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  emailValidate: {
    required: string;
    pattern: {
      value: RegExp;
      message: string;
    };
  };
}


export interface PasswordInputInterface {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  passwordValidate: {
    required: string;
    pattern: {
      value: RegExp;
      message: string;
    };
  };
}