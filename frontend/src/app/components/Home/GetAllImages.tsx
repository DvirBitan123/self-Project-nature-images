import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai'
import { categoryAtom } from '../../Jotai atoms/Jotai_atoms';
import { openAtom, idAtom, emailAtom } from '../../Jotai atoms/Jotai_atoms';
import returnImagesByCategory from './ReturnImagesBycategory';

export default function GetAllImages() {
  const navigate = useNavigate();
  const [imgCategory] = useAtom(categoryAtom);
  const [openModal, setOpenModal] = useAtom(openAtom);
  const [imgID, setImgID] = useAtom(idAtom);
  const [userEmail, setUserEmail] = useAtom(emailAtom);  

  const data = returnImagesByCategory(imgCategory)
  if (data) {
    const imagesArr = data.map((image) => {
      return (
        <img
          className="rounded-3xl p-4 max-w-sm max-h-sm cursor-pointer ease-in-out duration-300 hover:origin-bottom hover:scale-105"
          key={image.id} src={image.url} alt={image.alt} 
          onClick={() => {
            setOpenModal(true);
            setImgID(image.id)
          }}
          />
      )
    })

    return (
      <>
        <div className='grid justify-items-center '>
          <div className='flex justify-start flex-wrap'>
            {imagesArr}
          </div>
        </div>
      </>
    )
  }
}

