import ReturnImgById from "./ReturnImgById";
import { imgNameAtom, urlAtom, idAtom } from "../../Jotai atoms/Jotai_atoms";
import { useAtom } from 'jotai';
import { IdentificationIcon, CameraIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline'


export default function ModalBody() {
  const [imgID, setImgID] = useAtom(idAtom);
  const [downloadUrl, setDownloadUrl] = useAtom(urlAtom);
  const [imgName, setImgName] = useAtom(imgNameAtom);


  const singleImage = ReturnImgById(imgID);

  if (singleImage !== undefined) {
    setDownloadUrl(singleImage.url);  
    setImgName(`${singleImage.alt}.jpg`); 
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
      </div>
    </>
  )
}
