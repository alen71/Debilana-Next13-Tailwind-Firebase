import React, { useRef, useState } from 'react'

import Navbar from '../components/layout/navbar/Navbar'
import ImageSvg from '../assets/image.svg'
import TextareaCustom from '../components/shared/TextareaCustom'
import CreatePostButton from '../components/shared/CreatePostButton'
import { addDoc, collection } from 'firebase/firestore'
import { db, storage } from '../utils/firebase/firebase-utils'
import { PostCategory, PostsStatus } from '../utils/types/posts.types'
import { ref, uploadBytes, uploadString } from 'firebase/storage'
import ReactPlayer from 'react-player'
import DisplayUploadedFile from '../components/shared/DisplayUploadedFile'
import MessagePopup from '../components/shared/MessagePopup'

const CreatePost = () => {
  const [isTyping, setIsTyping] = useState(false)
  const [displayMessage, setDisplayMessage] = useState({
    message: '',
    open: false,
    type: true
  })
  const [textareaText, setTextareaText] = useState('')
  const [videoURL, setVideoURL] = useState('')
  const [uploadFile, setUploadFile] = useState<any>(null)
  const [uploadFileNow, setUploadFileNow] = useState({
    URL: '',
    type: ''
  })
  const maxFileSize = 55 * 1024 * 1024

  const selectEl = useRef<null | HTMLSelectElement>(null)

  const checkTyping = (e: any) => {
    setTextareaText(e.target.value)

    if (e.target.value.length > 0 && !isTyping) {
      setIsTyping(!isTyping)
    } else if (e.target.value.length === 0 && isTyping) {
      setIsTyping(!isTyping)
    }
  }

  const createPostFunction = async (e: any) => {
    e.preventDefault()

    // if (true) return

    try {
      const docRef = await addDoc(collection(db, 'posts'), {
        category: selectEl.current?.value,
        content: textareaText,
        created_at: new Date().toISOString(),
        like: 0,
        dislike: 0,
        status: PostsStatus.PENDING,
        videoURL: videoURL.length > 0 ? videoURL : '',
        fileName: uploadFile.name.length > 0 ? uploadFile.name : '',
        fileType: uploadFile.name.length > 0 ? uploadFile.type : ''
      })

      if (uploadFile.size > maxFileSize)
        throw new Error('Fajl je veći od 50mb!')

      if (uploadFile.size < maxFileSize && uploadFile.name.length > 0) {
        const picRef = ref(storage, `images/${uploadFile.name}`)
        const videoRef = ref(storage, `video/${uploadFile.name}`)

        if (uploadFile.type.includes('image')) {
          uploadBytes(picRef, uploadFile).then(res => {
            console.log('radi photo')
          })
        } else if (uploadFile.type.includes('video')) {
          uploadBytes(videoRef, uploadFile).then(res => {
            console.log('radi video')
          })
        }
      }

      setTextareaText('')
      setIsTyping(!isTyping)
      setDisplayMessage({
        message: 'Uspešno ste kreirali objavu!',
        open: true,
        type: true
      })
    } catch (e) {
      setDisplayMessage({
        message: 'Uspešno ste kreirali objavu!',
        open: true,
        type: false
      })
    }
  }

  const renderTestFile = (e: any) => {
    const file = e.target.files[0]

    let url = null

    if (window.example.createObjectURL != undefined) {
      url = window.example.createObjectURL(file)
    } else if (window.URL != undefined) {
      url = window.URL.createObjectURL(file)
    } else if (window.webkitURL != undefined) {
      url = window.webkitURL.createObjectURL(file)
    }

    setUploadFileNow({ URL: url, type: file.type })
  }

  return (
    <div className="h-screen pb-6 overflow-y-scroll overflow-x-hidden">
      <Navbar hideSortTable hideSearch />

      <MessagePopup
        isOpen={displayMessage.open}
        message={displayMessage.message}
        messageType={displayMessage.type}
        closeMessage={() =>
          setDisplayMessage({ ...displayMessage, open: false })
        }
      />

      <div className="mx-6 md:mx-auto md:max-w-xl 2xl:max-w-[700px]">
        <p className="text-center text-xl sm:text-3xl mt-6 pb-2 sm:pb-4">
          Pravila za objavljivanje sadržaja su:
        </p>
        <p className="text-center font-bold uppercase text-3xl sm:text-5xl mb-6">
          10 božijih zapovesti
        </p>

        <form
          className="flex gap-5 flex-col rounded-md text-sm sm:text-base bg-main-gray dark:bg-gray-dark px-6 pt-8 pb-14 mb-6"
          onSubmit={createPostFunction}
        >
          <h2 className="font-bold text-lg sm:text-2xl capitalize text-center">
            napravi objavu
          </h2>

          <select
            ref={selectEl}
            className="text-center rounded-md py-1 border-2 bg-transparent"
          >
            <option
              value={PostCategory.DEBILANA}
              className="bg-transparent text-black"
            >
              Debilana
            </option>
            <option
              value={PostCategory.GASTARBAJTER}
              className="bg-transparent text-black"
            >
              Gastarbajter
            </option>
          </select>

          <TextareaCustom
            rows={10}
            placeholder="* Napiši nešto..."
            name="Create post"
            required
            value={textareaText}
            onChange={checkTyping}
          />
          <div>
            <p className="pb-2">
              Polje za dodavanje slike ili video snimka nije obavezno.
            </p>
            <div className="w-full  bg-white dark:bg-black rounded-md border-2 px-5 pb-5 pt-7 flex flex-col items-center">
              <ImageSvg className="lg:scale-125 dark:text-white" />
              <p className="mb-3 mt-6 text-center">
                Izaberi i postavi fotografiju ili video snimak <br />
                (maksimalna veličina fajla 50mb)
              </p>
              <div className="w-full h-64 flex items-center justify-center border-2 border-dashed border-main-gray dark:border-primary-dark relative">
                <button
                  type="button"
                  className="bg-light-yellow hover:bg-yellow text-black overflow-hidden cursor-pointer rounded-full py-2 px-5 leading-[21px] relative"
                >
                  Odaberi fajl...
                  <input
                    type="file"
                    className="opacity-0 absolute top-0 left-0 w-full h-full z-20 cursor-pointer"
                    onChange={(e: any) => {
                      renderTestFile(e)
                      setUploadFile(e.target.files[0])
                    }}
                    accept="video/* image/jpeg image/png image/webP"
                  />
                </button>

                <DisplayUploadedFile
                  uploadFileNow={uploadFileNow}
                  setUploadFile={setUploadFile}
                  setUploadFileNow={setUploadFileNow}
                />
              </div>

              <p className="py-3">ili</p>
              <input
                type="text"
                placeholder="Nalepi URL video snimka"
                value={videoURL}
                onChange={(e: any) => setVideoURL(e.target.value)}
                className="bg-primary-light border-main-gray focus:border-black focus:dark:border-primary-dark focus:bg-main-gray dark:bg-gray-dark focus:placeholder:text-black focus:placeholder:dark:text-primary-dark w-full rounded-lg py-2 px-3 outline-none placeholder:text-gray-text-hover border-2 "
              />
              <p className="pt-3 text-center sm:text-left">
                Podržavamo linkove sa YouTube i Vimeo platforme.
              </p>

              {videoURL.length > 0 && (
                <div className="mt-4 w-full">
                  <ReactPlayer url={videoURL} width="100%" />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-0 justify-end">
            {/* <div className="relative flex items-center gap-4 ">
              <input
                type="checkbox"
                name="is visible"
                className="peer w-6 h-6 absolute left-[2px] top-[2px] opacity-0 cursor-pointer z-10"
              />
              <div className="w-7 h-7 border-2 block rounded-full "></div>
              <div className="w-4 h-4 rounded-full block bg-black dark:bg-white absolute top-[6px] left-[6px] invisible peer-checked:visible"></div>
              <p>Da li želiš da ostaneš anoniman?</p>
            </div> */}
            <CreatePostButton isTyping={isTyping} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePost
