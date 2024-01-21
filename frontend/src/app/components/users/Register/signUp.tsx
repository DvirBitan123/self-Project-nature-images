import { useForm, FieldValues } from 'react-hook-form';
import { useMutation } from "@apollo/client";
import { createUserMutaion } from "../../../UsersGraphQL/usersMutations";
import { useNavigate } from 'react-router-dom';
import { EMAIL_VALIDATE, PASSWORD_VALIDATE } from '../../../utils/validations';
import EmailInput from '../EmailInput';
import PasswordInput from '../passowrdInput';
import classNames from '../../../utils/ClassNames';
import ROUTES from '../../../router/routes';

export default function SigUp() {
  const [craeteNewUser, { error: mutationError }] = useMutation(createUserMutaion);
  const navigate = useNavigate();
  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const inputEmail = watch('email');
  const inputPassword = watch('password');

  const CreateUserFunc = async (event: FieldValues) => {
    event.preventDefault();
    try {
      await craeteNewUser({
        variables: { email: inputEmail, password: inputPassword },
        onCompleted: (data) => {
          const { createUser: { user: { email } } } = data;
          navigate(ROUTES.LOGIN);        
        }
      })

    } catch {
      throw new Error(`mutationError: ${mutationError}`);
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Nature Lens Icon"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a New Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={CreateUserFunc}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <EmailInput
                register={register}
                errors={errors}
                emailValidate={EMAIL_VALIDATE}
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
                passwordValidate={PASSWORD_VALIDATE}
              />
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
                    { validate: (value: string) => { if (watch("password") !== value) return '⚠ password do not match' } }
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
                disabled={!isValid}
                className={classNames(
                  isValid ? 'bg-indigo-600 transition duration-200 ease-out hover:bg-indigo-500 text-white' : 'bg-stone-400 text-stone-500 cursor-not-allowed',
                  'flex w-full justify-center rounded-md cursor-pointer px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                )}
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a href={ROUTES.LOGIN} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign In!
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
