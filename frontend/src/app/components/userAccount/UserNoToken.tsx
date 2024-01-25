import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import ROUTES from "../../router/routes";

interface props {
  message: string
}
export default function UserNoToken(props: props) {
  return (
    <>
      <div className="grid place-items-center w-full h-full">
        <h1 className="text-4xl font-medium mt-5 mb-8">{props.message}</h1>
        <a
          className="flex font-medium text-white bg-gradient-to-r from-pink-500 to-purple-500 ease-out duration-200 hover:from-fuchsia-500 hover:to-cyan-500 px-4 py-2 rounded-lg hover:py-4 hover:px-6"
          href={ROUTES.LOGIN}>

          Login <ArrowLongRightIcon className="w-8 h-7 ml-2" />
        </a>
        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account yet?{' '}
          <a href={ROUTES.REGISTER} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign Up!
          </a>
        </p>
      </div>
    </>
  )
}

