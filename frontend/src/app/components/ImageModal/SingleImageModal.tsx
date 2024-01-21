import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ArrowDownTrayIcon, CalendarIcon, CameraIcon, IdentificationIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { saveAs } from 'file-saver';
import { ImageInterface } from '../../types/ImagesTypes';

interface Props {
  image: ImageInterface
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SingleImageModal(props: Props) {
  const cancelButtonRef = useRef(null);
  const singleImage = props.image;

  if (props.image)
    return (
      <>
        <Transition.Root show={props.openModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={props.setOpenModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900 grid justify-items-center">
                            Image Details
                          </Dialog.Title>
                          <div className="mt-2">
                            <img
                              className="mx-7 my-4 rounded-2xl max-w-3xl max-h-fit"
                              src={singleImage?.url} alt={singleImage?.alt}
                            />
                            <div className='mx-8'>
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
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ease-in-out duration-300 hover:bg-green-500 sm:ml-3 sm:w-auto"
                        onClick={() => {
                          saveAs(singleImage!.url, `${singleImage!.alt}.jpg`);
                          props.setOpenModal(false);
                        }}
                      >
                        Download Image
                        <ArrowDownTrayIcon className="h-5 w-5 ml-2" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ease-in-out duration-300 hover:bg-gray-100 sm:mt-0 sm:w-auto"
                        onClick={() => props.setOpenModal(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </>
    )
}
