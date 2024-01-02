import ReturnImgById from "./ReturnImgById";
import { urlAtom } from "../../Jotai atoms/Jotai_atoms";
import { useAtom } from 'jotai';
import { idAtom } from "../../Jotai atoms/Jotai_atoms";
import { IdentificationIcon, CameraIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline'
import crested_lark from '../../../image_example/crested_lark.jpg';


export default function ModalBody() {
  const [imgID, setImgID] = useAtom(idAtom);
  const [downloadUrl, setDownloadUrl] = useAtom(urlAtom);
  console.log('larky', crested_lark);
  

  const singleImage = ReturnImgById(imgID);
  // console.log('url:', singleImage?.url);

  if (singleImage !== undefined) {
    setDownloadUrl(singleImage!.url);    
  }

  return (
    <>
      <div>
        <img
          className="rounded-3xl p-4 max-w-3xl max-h-3xl"
          src={singleImage?.url} alt={singleImage?.alt}
        />

        <p className="text-lg text-black-800">
          {singleImage?.description}
        </p>
        <br></br>

        <p className="inline-flex text-base text-black-700">
          <IdentificationIcon className="h-5 w-5 mr-3" aria-hidden="true" />
          {singleImage?.category}<br></br>
        </p>
        <br></br>

        <p className="inline-flex text-base text-black-700">
          <CameraIcon className="h-5 w-5 mr-3" aria-hidden="true" />
          {singleImage?.equipment}
        </p>
        <br></br>

        <p className="inline-flex text-base text-black-700">
          <CalendarIcon className="h-5 w-5 mr-3" aria-hidden="true" />
          {singleImage?.date}
        </p>
        <br></br>

        <p className="inline-flex text-base text-black-700">
          <MapPinIcon className="h-5 w-5 mr-3" aria-hidden="true" />
          {singleImage?.location}
        </p>

        <a
          href={crested_lark}
          download='image.jpg'
          target="_blank"
          rel="noreferrer"
        >

        </a>
      </div>
    </>
  )
}
