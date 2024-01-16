import { trpc } from '../../utils/ConnectTotRPC';
import { trpc2 } from '../../utils/ConnectTotRPC';
import CategoriesSwitch from '../../utils/MySwitch';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../router/routes';
import jwt from 'jsonwebtoken'
import { useEffect, useState } from 'react';
import { BackspaceIcon } from '@heroicons/react/24/outline';
import { deleteImageFunc } from './EditUserImages';


export default function UserAccount() {
  const navigate = useNavigate();
  const userToken = localStorage.getItem('images_token');
  const { data: allCategories, error: allCatError } = trpc.getAllCategories.useQuery();
  const { data: userCategories, error: userCatError } = trpc.getUserCategories.useQuery(userToken!);
  const { data: userImages, error: imagesError } = trpc.getUserImages.useQuery(userToken!);
  // const [mashu, setMashue] = useState<JSX.Element[]>([]);
  useEffect(() => {
    if (userCatError || imagesError) {
      localStorage.setItem('images_token', '');
      navigate(ROUTES.LOGIN)
    }
  }, [userCatError, imagesError])


  if (userCategories && userImages && allCategories) {
    const categoriesArr = allCategories.map((item) => {
      let checked = false;
      if (userCategories.includes(item.name)) checked = true
      return (
        <div className='flex p-2' key={item.id}>
          <p key={item.name} className='pr-1 '>
            {item.name}
          </p>
          <CategoriesSwitch 
            startVal={checked} 
            token={userToken!} 
            categoryId={item.id} 
          />
        </div>
      )
    })

    const imagesArr = userImages.map((item) => {
      return (
        <div key={item.url} className='relative w-72 max-h-72 p-4 m-4'>
          <button 
              className='border-1 border-black max-w-30 max-h-20 bg-blue-500'
              key={item.alt}
              onClick={async () => { 
                await deleteImageFunc(userToken!, item.image_id!);
              }}
            >
              delete image {<BackspaceIcon className='w-8 h-8' />}
          </button>
            
            
          <img
            className="rounded-3xl p-4 object-cover max-w-72 max-h-72 cursor-pointer ease-in-out duration-300 hover:origin-bottom hover:scale-105"
            key={item.image_id} src={item.url} alt={item.alt}
          />
          {/* {<BackspaceIcon
            className=' w-10 h-10 absolute top-1/4 right-1/4 '
          //  className='absolute top-1/4 right-1/4 transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 border-none rounded text-cyan-500 max-w-4 max-h-4'
          />
          } */}
        </div>
      )
    })
    


    return (
      <>
        <h1>Hello this is the user account PAGE!!!!</h1>
        <br></br>
        <div >
          <p>categories:</p>
          <div>{categoriesArr}</div>
        </div>
        <br></br>
        <p>Images you liked:</p>
        <div className='flex justify-start flex-wrap'>
          <br></br>
          {imagesArr}
        </div>
      </>
    )
  }
}