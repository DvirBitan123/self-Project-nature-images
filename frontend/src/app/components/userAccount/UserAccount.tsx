import { trpc } from '../../utils/ConnectTotRPC';
import MySwitch from '../../utils/MySwitch';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../router/routes';
import jwt from 'jsonwebtoken'
import { useEffect } from 'react';


export default function UserAccount() {
  const navigate = useNavigate();
  const userToken = localStorage.getItem('images_token');
  const { data: allCategories, error: allCatError } = trpc.getAllCategories.useQuery();
  const { data: userCategories, error: userCatError } = trpc.getUserCategories.useQuery(userToken!);
  const { data: userImages, error: imagesError } = trpc.getUserImages.useQuery(userToken!);
  useEffect(() => {
    if (userCatError || imagesError) {
      localStorage.setItem('images_token', '');
      navigate(ROUTES.LOGIN)
    }
  }, [userCatError, imagesError])

  let i = 0;
  if (userCategories && userImages && allCategories) {
    const categoriesArr = allCategories.map((item) => {
      let checked = false;
      if (userCategories.includes(item.name)) checked = true
      return (
        <div className='flex p-2' key={item.id}>
          <p key={item.name} className='pr-1 '>
            {item.name}
          </p>
          <MySwitch startVal={checked} />
        </div>
      )
    })

    const imagesArr = userImages.map((item) => {
      return (
        <img
          className="rounded-3xl p-4 max-w-72 max-h-72 cursor-pointer ease-in-out duration-300 hover:origin-bottom hover:scale-105"
          key={item.image_id} src={item.url} alt={item.alt}
        />
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