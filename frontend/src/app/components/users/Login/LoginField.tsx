import { useForm, FieldValues } from 'react-hook-form';
import { useMutation } from "@apollo/client";
import { createUserMutaion } from "../../../UsersGraphQL/usersMutations";
import { useNavigate } from 'react-router-dom';
import { emailAtom } from '../../../Jotai atoms/Jotai_atoms';
import { useAtom } from 'jotai';
import { emailValidate, passwordValidate } from '../../../utils/validations';
import EmailInput from '../EmailInput';
import PasswordInput from '../passowrdInput';
import classNames from '../../../utils/ClassNames';

export default function LoginField() {
  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const inputEmail = watch('email');
  const inputPassword = watch('password');


  return (
    <form className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Email address
        </label>
        <EmailInput
          register={register}
          errors={errors}
          emailValidate={emailValidate}
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            Password
          </label>
        </div>
        <PasswordInput
          register={register}
          errors={errors}
          passwordValidate={passwordValidate}
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={!isValid}
          className={classNames(
            isValid ? 'bg-indigo-600 transition duration-200 ease-out hover:bg-indigo-500 text-white' : 'bg-stone-400 text-stone-500 cursor-not-allowed',
            'flex w-full justify-center rounded-md cursor-pointer px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          )}
        >
          Sign In
        </button>
      </div>
    </form>
  )
}

