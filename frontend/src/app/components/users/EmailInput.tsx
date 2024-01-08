import { FC } from "react";
import { EmailInputInterface } from "../../types/inputsInterface";

const EmailInput: FC<EmailInputInterface> = ({
  register,
  emailValidate,
  errors
}) => {
  return (
    <>
      <div className="mt-2">
        <input
          {...register("email", emailValidate)}
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <p>{errors.email?.message?.toString()}</p>
      </div>
    </>
  )
}

export default EmailInput