

export default function LoadingLogo() {
  return (
    <>
      <div className='grid place-content-center'>
          <img 
            className='animate-pulse h-auto w-64 mx-4 my-10 text-cyan-500'
            src="http://localhost:8181/public/Logo.png"
            alt="Nature Lens Icon"
          />
      </div>
    </>
  )
}