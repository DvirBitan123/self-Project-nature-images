import { trpc } from '../utils/ConnectTotRPC';

export default function GetAllImages() {

  const { data } = trpc.getAllImages.useQuery();

  console.log('all images', data);
  if (data) {
    const imagesArr = data.map((image) => {
      return (
        <img className="rounded-3xl p-4 max-w-sm max-h-sm cursor-pointer ease-in-out duration-300 hover:bg-blue-100" src={image.url} alt={image.alt} />
      )
    })

    return (
      <>
        <div className='grid place-content-center '>
          <div className=' flex justify-start'>
            {imagesArr}
          </div>
        </div>
      </>
    )
  }
}

