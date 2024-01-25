import { useForm, FieldValues } from 'react-hook-form';
import { useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { EMAIL_VALIDATE, PASSWORD_VALIDATE } from '../../../utils/validations';
import EmailInput from '../EmailInput';
import PasswordInput from '../passowrdInput';
import classNames from '../../../utils/ClassNames';
import { authMutation } from '../../../UsersGraphQL/authMutation';
import { useState } from 'react';
import ROUTES from '../../../router/routes';
import { useSetAtom } from 'jotai';
import { userEmailAtom } from '../../../Jotai atoms/Jotai_atoms';


export default function Login() {
  const [wrongMessage, setWrongMessage] = useState('');
  const setUserEmail = useSetAtom(userEmailAtom);
  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const [authUser] = useMutation(authMutation);
  const inputEmail = watch('email');
  const inputPassword = watch('password');

  const jwtAuthLogin = async (event: FieldValues) => {
    event.preventDefault();
    try {
      await authUser({
        variables: { email: inputEmail, password: inputPassword },
        onCompleted: (data) => {
          const { authenticate: { jwtToken } } = data;
          if (jwtToken) {
            localStorage.setItem('user_token', jwtToken);
            localStorage.setItem('user_email', inputEmail);
            setUserEmail(inputEmail);
            navigate(ROUTES.HOME);
          }
          else setWrongMessage('⚠ Wrong Email or Password');
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-auto w-48"
            src="http://localhost:8181/public/Logo.png"
            alt="Nature Lens Icon"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign In to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={jwtAuthLogin}>
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
              <p>{wrongMessage}</p>
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
          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account yet?{' '}
            <a href={ROUTES.REGISTER} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign Up!
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

