import Image from 'next/image'
import React, { Dispatch, SetStateAction } from 'react'

export type Props = {
  uploadFileNow: { URL: string; type: string }
  setUploadFileNow: Dispatch<SetStateAction<{ URL: string; type: string }>>
  setUploadFile: Dispatch<any>
}

const DisplayUploadedFile = ({
  uploadFileNow,
  setUploadFileNow,
  setUploadFile
}: Props) => {
  return (
    <>
      {uploadFileNow.URL.length > 0 &&
        uploadFileNow.type.startsWith('image') && (
          <div className="group w-full h-full absolute top-0 left-0">
            <div
              onClick={() => {
                setUploadFileNow({ URL: '', type: '' })
                setUploadFile(null)
              }}
              className="bg-[#ffffffb1] dark:bg-[#000000ad] w-full h-full absolute top-0 left-0 z-20 flex items-center justify-center hidden group-hover:flex cursor-pointer"
            >
              <p className="font-bold text-black text-4xl dark:text-primary-dark">
                X
              </p>
            </div>
            <Image
              src={uploadFileNow.URL}
              fill={true}
              alt="test"
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}

      {uploadFileNow.URL.length > 0 &&
        uploadFileNow.type.startsWith('video') && (
          <div className="group w-full h-full absolute top-0 left-0">
            <div
              onClick={() => {
                setUploadFileNow({ URL: '', type: '' })
                setUploadFile(null)
              }}
              className="bg-[#ffffffb1] dark:bg-[#000000ad] w-8 h-8 absolute top-0 right-0 z-20 flex items-center justify-center hidden group-hover:flex cursor-pointer"
            >
              <p className="font-bold text-black text-2xl dark:text-primary-dark">
                X
              </p>
            </div>
            <video src={uploadFileNow.URL} controls></video>
          </div>
        )}
    </>
  )
}

export default DisplayUploadedFile
