import { trpc2 } from '../../utils/ConnectTotRPC';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface AddProps {
  token: string
  imageId: string
  checked: boolean
  setuserIds: React.Dispatch<React.SetStateAction<string[] | undefined>>
};

export function LikeButton(props: AddProps) {
  const checked = props.checked;

  const handleUserImage = async () => {
    const imageInput = {
      token: props.token,
      imageId: props.imageId
    };

    if (props.checked === false) {
      const userArr = await trpc2.addUserImage.query(imageInput);
      props.setuserIds(userArr);
    }
    else if (props.checked === true) {
      const userArr = await trpc2.deleteUserImage.query(imageInput);
      props.setuserIds(userArr);
    }
  }

  return (
    <button onClick={handleUserImage}>
      {checked ? <HeartIconSolid className='w-8 h-8' /> : <HeartIcon className='w-8 h-8' />}
    </button>
  )

}