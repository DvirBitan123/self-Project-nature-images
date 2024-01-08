import { FC } from "react";
import { PasswordInputInterface } from "../../types/inputsInterface";

const passwordInput: FC<PasswordInputInterface> = ({
  register,
  passwordValidate,
  errors
}) => {
  return (
    <>
      <div className="mt-2">
        <input
          {...register("password", passwordValidate)}
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <p>{errors.password?.message?.toString()}</p>
      </div>
    </>
  )
}

export default passwordInput