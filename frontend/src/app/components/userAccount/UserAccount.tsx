import { trpc, trpc2 } from '../../trpcConnetion/ConnectTotRPC';
import CategoriesSwitch from '../../utils/CategorySwitch';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../router/routes';
import { useEffect, useState } from 'react';
import { BackspaceIcon } from '@heroicons/react/24/solid';
import { UserFuncsOutput } from '../../types/ImagesTypes';
import { useAtomValue } from 'jotai';
import { userEmailAtom } from '../../Jotai atoms/Jotai_atoms';

export default function UserAccount() {
  const navigate = useNavigate();
  const userToken = localStorage.getItem('user_token');
  const userEmail = useAtomValue(userEmailAtom);

  const { data: allCategories } = trpc.getAllCategories.useQuery();
  const { data: userCategories, error: userCatError } = trpc.getUserCategories.useQuery(userToken!);
  const { data: userImages, error: userImagesError } = trpc.getUserImages.useQuery(userToken!);
  const [imagesState, setImagesState] = useState<UserFuncsOutput[]>([]);
  const [uploadMessage, setUploadMessage] = useState<string>('');

  trpc.onUpload.useSubscription(userCategories!, {
    onData: (message) => {
      setUploadMessage(message);
    }
  });

  useEffect(() => {
    if (userImages) setImagesState(userImages);
  }, [userImages]);

  useEffect(() => {
    if (userCatError || userImagesError) {      
      localStorage.clear();
      navigate(ROUTES.LOGIN);
    }
  }, [userCatError, userImagesError]);

  const deleteImageFunc = async (userToken: string, imageId: string) => {
    const imageInput = {
      token: userToken,
      imageId: imageId
    };
    await trpc2.deleteUserImage.mutate(imageInput);
    const updatedImages = imagesState.filter((image) => image.image_id !== imageId);
    setImagesState(updatedImages);
  }

  if (userCategories && userImages && allCategories) {
    return (
      <div>
        <div className="grid place-content-center ">
          <a href={ROUTES.HOME}>
            <div className={uploadMessage ? 'bg-gradient-to-r from-rose-500 to-purple-500 my-2 rounded-lg' : ''}>
              <p className='text-lg font-medium text-stone-100 h-8 mx-5'>
                {uploadMessage}
              </p>
            </div>
          </a>
        </div>
        <h1 className='grid place-content-center text-4xl font-medium pt-2 pb-8'>Welcome {userEmail}</h1>
        <div className='flex justify-between mx-5'>
          <div>
            <p className='grid place-content-center text-2xl font-medium text-stone-700'>
              Images you liked:
            </p>
            <div className='flex justify-start flex-wrap max-w-xl'>
              {imagesState.map((item) => {
                return (
                  <div key={item.url} className='relative max-w-64 max-h-xs m-4'>
                    <button
                      className='absolute top-1 right-3 rounded-xl'
                      key={item.alt}
                      onClick={async () => {
                        await deleteImageFunc(userToken!, item.image_id!);
                      }}
                    >
                      {<BackspaceIcon className='w-8 h-8 ease-out duration-150 hover:text-stone-300' />}
                    </button>
                    <img
                      className="rounded-3xl max-w-full h-auto"
                      key={item.image_id}
                      src={item.url}
                      alt={item.alt}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          <div className='mx-20'>
            <p className='text-2xl font-medium text-stone-700'>
              Categories:
            </p>
            <div>
              {allCategories.map((item) => {
                let checked = false;
                if (userCategories.includes(item.name)) checked = true;
                return (
                  <div className='flex justify-between py-2' key={item.id}>
                    <p key={item.name} className='pr-6'>
                      {item.name}
                    </p>
                    <CategoriesSwitch
                      startVal={checked}
                      token={userToken!}
                      categoryId={item.id}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}