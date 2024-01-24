import { useNavigate } from "react-router-dom";
import ROUTES from "../router/routes";


export default function NotFoundPage() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate(ROUTES.HOME);
  };
  return (
    <div className="grid place-content-center">
      <p className="grid place-content-center mx-4 mt-10 text-3xl font-medium text-stone-900">
        OOPS!
      </p>
      <p className="text-3xl font-medium text-stone-900">
        The page you're looking for doesn't exist.
      </p>
      <img
        className="max-w-sm max-h-sm shadow-2xl my-5 mx-20"
        src="http://localhost:8181/public/IMG_8163.jpg"
        alt="Page not found"
      />
      <button 
        className="px-4 py-2 rounded-lg text-xl font-medium text-white bg-gradient-to-r from-pink-500 to-purple-500 ease-out duration-200 hover:from-fuchsia-500 hover:to-cyan-500"
        onClick={goHome}
      >
        Back Home 
      </button>
    </div>
  )

}

