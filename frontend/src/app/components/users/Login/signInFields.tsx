import { FieldValues, useForm } from 'react-hook-form';
import { useMutation } from "@apollo/client";
import { createUserMutaion } from "../../../UsersGraphQL/usersMutations";
import { useNavigate } from 'react-router-dom';
import { emailAtom } from '../../../Jotai atoms/Jotai_atoms';
import { useAtom } from 'jotai';
import { emailValidate, passwordValidate } from '../../../utils/validations';
import { useState } from 'react';

export default function SigInFields() {
  const [craeteNewUser, { data, loading, error: mutationError }] = useMutation(createUserMutaion);
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useAtom(emailAtom);
  const [confirmError, setConfirmError] = useState('')
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const inputEmail = watch('email');
  const inputPassword = watch('password');
  const confirmPassword = watch('confirm_password');

  const checkConfirmPass = () => {
    if (confirmPassword !== inputPassword) 
    setConfirmError('⚠ password do not match')
  }

  const createUserFunc = async () => {
    try {
      await craeteNewUser({
        variables: { email: inputEmail, password: inputPassword },
        onCompleted: (data) => {
          const { createUser: { user: { email } } } = data;
          setUserEmail(email);
          // navigate('/ ');        
        }
      })

    } catch {
      throw new Error(`mutationError: ${mutationError}`);
    }
  }

  return (
    <>
      <form className="space-y-6" action='/' onSubmit={createUserFunc}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
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
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
          </div>
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
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Confirm Password
            </label>
          </div>
          <div className="mt-2">
            <input
              {...register("confirm_password",
               {validate: (value: string) => { if( watch("password") !== value) return '⚠ password do not match'} }
                )}
              id="confirm_password"
              name="confirm_password"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <p>{errors.confirm_password?.message?.toString()}</p>
          </div>
        </div>

        <div>
          <button
            type="submit"
            // disabled={!isValid}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            // onClick={createUserFunc}
          >
            Sign in
          </button>
        </div>
      </form>
    </>
  )
}