import { useAtomValue, useSetAtom } from 'jotai';
import { categoryAtom, userEmailAtom } from '../../Jotai atoms/Jotai_atoms';
import CategoriesFilterButtons from './CategoriesFilterButtons';
import { trpc, trpc2 } from '../../trpcConnetion/ConnectTotRPC';
import { LikeButton } from './LikeButton';
import { ReactNode, useEffect, useState } from 'react';
import SingleImageModal from '../ImageModal/SingleImageModal';
import { ImageInterface } from '../../types/ImagesTypes';
import { ToastContainer } from 'react-toastify';
import LoadingLogo from '../../utils/LoadingLogo';

export default function AllImages(): ReactNode {
  const imgCategory = useAtomValue(categoryAtom);
  const [openModal, setOpenModal] = useState(false);
  const [singleImage, setSingleImage] = useState<ImageInterface>();
  const [tokenTimeout, setTokenTimeout] = useState<boolean>(false);
  const setUserEmail = useSetAtom(userEmailAtom);

  const userToken = localStorage.getItem('user_token');

  const { data: allImages } = trpc.getImagesByCategory.useQuery(imgCategory);
  const [usersImgIds, setUsersImgIds] = useState<string[] | undefined>([]);

  useEffect(() => {
    const fetchUserImages = async () => {
      try {
        if (userToken) {
          const data = await trpc2.getUserImagesIds.query(userToken!);
          setUsersImgIds(data);
        }
      }
      catch (error) {
        setTokenTimeout(true);
        localStorage.setItem('user_email', '');
        setUserEmail('');
      }
    };
    fetchUserImages();
  }, []);

  if (allImages) {
    const imagesArr = allImages.map((image) => {
      let checked = false;
      if (usersImgIds?.includes(image.id)) {
        checked = true;
      }
      return { ...image, checked }
    });

    return (
      <>
        <div className='grid justify-items-center'>
          <CategoriesFilterButtons />
          <div className='grid justify-center'>
            <div className='flex justify-start flex-wrap max-w-6xl'>
              {imagesArr.map((image) => {
                return (
                  <div
                    key={image.url}
                    className='relative max-w-sm max-h-sm ease-in-out duration-300 hover:origin-bottom hover:scale-105'
                  >
                    <LikeButton
                      key={image.alt}
                      token={userToken}
                      imageId={image.id}
                      checked={image.checked}
                      setUserIds={setUsersImgIds}
                      tokenTimeout={tokenTimeout}
                    />
                    <img
                      className="rounded-3xl p-4 w-full h-auto cursor-pointer"
                      key={image.id} src={image.url} alt={image.alt}
                      onClick={() => {
                        setOpenModal(true);
                        setSingleImage(image)
                      }}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <SingleImageModal
          image={singleImage!}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
        <ToastContainer
          hideProgressBar
          position="bottom-left"
          theme='colored'
        />
      </>
    )
  }
}

