import { useAtom } from 'jotai';
import { categoryAtom, openAtom, idAtom, usersImagesAtom } from '../../Jotai atoms/Jotai_atoms';
import CategoriesFilterButtons from './CategoriesFilterButtons';
import { trpc, trpc2 } from '../../utils/ConnectTotRPC';
import { LikeButton } from './LikeButton';
import { ReactNode, useEffect, useState } from 'react';

export default function AllImages(): ReactNode {
  const [imgCategory] = useAtom(categoryAtom);
  const [openModal, setOpenModal] = useAtom(openAtom);
  const [imgID, setImgID] = useAtom(idAtom);
  const userToken = localStorage.getItem('images_token');

  const { data: allImages } = trpc.getImagesByCategory.useQuery(imgCategory);
  const [usersImgIds, setUsersImgIds] = useState<string[] | undefined>([]);
  
  useEffect(() => {
    const fetchUserImages = async () => {
      if (userToken !== '') {
        console.log('user token:', userToken);
        const data = await trpc2.getUserImagesIds.query(userToken!);
        setUsersImgIds(data);
      }
    };
    fetchUserImages();
  }, [])

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
          <br></br>
          <CategoriesFilterButtons />
          <br></br>
          <div className='flex justify-start flex-wrap'>
            {imagesArr.map((image) => {
              return (
                <div 
                  key={image.url} 
                  className='relative max-w-sm max-h-sm ease-in-out duration-300 hover:origin-bottom hover:scale-105'
                >
                  <LikeButton
                    key={image.alt}
                    token={userToken!}
                    imageId={image.id}
                    checked={image.checked}
                    setuserIds={setUsersImgIds}
                  />
                  <img
                    className="rounded-3xl p-4 w-full h-auto cursor-pointer "
                    key={image.id} src={image.url} alt={image.alt}
                    onClick={() => {
                      setOpenModal(true);
                      setImgID(image.id)
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </>
    )
  }
}

