import { trpc2 } from '../../utils/ConnectTotRPC';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AddProps {
  token: string
  imageId: string
  checked: boolean
  setUserIds: React.Dispatch<React.SetStateAction<string[] | undefined>>
};

export function LikeButton(props: AddProps) {
  const checked = props.checked;

  const handleUserImage = async () => {
    const imageInput = {
      token: props.token,
      imageId: props.imageId
    };
    if (props.token !== '') {      
      if (props.checked === false) {
        const userArr = await trpc2.addUserImage.query(imageInput);
        props.setUserIds(userArr);
      }
      else if (props.checked === true) {
        const userArr = await trpc2.deleteUserImage.query(imageInput);
        props.setUserIds(userArr);
      }
    }
    else {
      toast.warn("You have to login first!");
    }
  }


  return (
    <>
      <button onClick={handleUserImage} className='absolute top-5 right-5 p-2 rounded-xl bg-stone-100 '>
        {checked ? <HeartIconSolid className='w-6 h-6 ease-in-out duration-200 hover:w-7 hover:h-7' /> : <HeartIcon className='w-6 h-6 ease-in-out duration-200 hover:w-7 hover:h-7' />}
      </button>
    </>
  )

}