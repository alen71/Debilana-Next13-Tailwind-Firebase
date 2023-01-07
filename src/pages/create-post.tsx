import React, { useRef, useState } from 'react'
import { ref, uploadBytes, uploadString } from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore'
import { db, storage } from '../utils/firebase/firebase-utils'

import Navbar from '../components/layout/navbar/Navbar'
import ImageSvg from '../assets/image.svg'
import TextareaCustom from '../components/shared/TextareaCustom'
import CreatePostButton from '../components/shared/CreatePostButton'
import { PostCategory, PostsStatus } from '../utils/types/posts.types'
import ReactPlayer from 'react-player'
import DisplayUploadedFile from '../components/shared/DisplayUploadedFile'
import MessagePopup from '../components/shared/MessagePopup'
import { maxFileSize } from '../utils/const'
import useUserLogIn from '../store/useUserLogIn'

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
  const { loggedIn } = useUserLogIn()

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

    try {
      const docRef = await addDoc(collection(db, 'posts'), {
        category: selectEl.current?.value,
        content: textareaText,
        created_at: new Date().toISOString(),
        like: 0,
        dislike: 0,
        status: loggedIn ? PostsStatus.APPROVED : PostsStatus.PENDING,
        videoURL: videoURL ? videoURL : '',
        fileName: uploadFile ? uploadFile.name : '',
        fileType: uploadFile ? uploadFile.type : ''
      })

      if (uploadFile && uploadFile.size > maxFileSize)
        throw new Error('Fajl je veći od 50mb!')

      if (uploadFile && uploadFile.size < maxFileSize) {
        const picRef = ref(storage, `images/${docRef.id}/${uploadFile.name}`)
        const videoRef = ref(storage, `video/${docRef.id}/${uploadFile.name}`)

        if (uploadFile.type.includes('image')) {
          uploadBytes(picRef, uploadFile).then(res => {
            console.log('radi photo')
            console.log(res)
          })
        } else if (uploadFile.type.includes('video')) {
          uploadBytes(videoRef, uploadFile).then(res => {
            console.log('radi video')
            console.log(res)
          })
        }
      }

      setTextareaText('')
      setUploadFileNow({ URL: '', type: '' })
      setVideoURL('')
      setIsTyping(!isTyping)
      setDisplayMessage({
        message: 'Uspešno ste kreirali objavu!',
        open: true,
        type: true
      })
    } catch (e) {
      setDisplayMessage({
        message: 'Objava nije kreirana!',
        open: true,
        type: false
      })
      console.log(e)
    }
  }

  const renderTestFile = (e: any) => {
    const file = e.target.files[0]

    let url = null

    if (window.createObjectURL != undefined) {
      url = window.createObjectURL(file)
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

      <div className="mx-6 pt-6 md:mx-auto md:max-w-xl 2xl:max-w-[700px]">
        <form
          className="relative flex gap-5 flex-col rounded-md text-sm sm:text-base bg-white dark:bg-black px-6 pt-8 pb-14 mb-6 shadow-container-shadow dark:shadow-none dark:border-[1px] dark:border-gray"
          onSubmit={createPostFunction}
        >
          <h2 className="font-bold text-lg sm:text-2xl">Napravi objavu</h2>

          <select
            ref={selectEl}
            className="text-center rounded-md py-1 border-[1px] bg-transparent text-gray"
          >
            <option
              value={PostCategory.DEBILANA}
              className="bg-transparent text-gray"
            >
              Debilana
            </option>
            <option
              value={PostCategory.GASTARBAJTER}
              className="bg-transparent text-gray"
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
            <p className="pb-2 text-black dark:text-white">
              Polje za dodavanje slike ili video snimka nije obavezno.
            </p>
            <div className="w-full text-gray bg-white dark:bg-black rounded-md border-[1px] border-gray px-5 pb-5 pt-7 flex flex-col items-center">
              <ImageSvg className="lg:scale-125 text-gray" />
              <p className="mb-3 mt-6 text-center">
                Izaberi i postavi fotografiju ili video snimak <br />
                (maksimalna veličina fajla 50mb)
              </p>
              <div className="w-full h-52 md:h-64 flex items-center justify-center border-[1px] border-dashed border-primary relative">
                <button
                  type="button"
                  className="bg-primary hover:bg-primary-light text-black overflow-hidden cursor-pointer rounded-full py-2 px-5 leading-[21px] relative"
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
                className="bg-transparent border-gray focus:border-black focus:dark:border-white placeholder:dark:text-gray focus:placeholder:dark:text-white focus:placeholder:text-black w-full rounded-lg py-2 px-3 outline-none border-[1px] placeholder:text-xs sm:placeholder:text-sm"
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
            <CreatePostButton isTyping={isTyping} />
          </div>
          <p
            className={`${
              loggedIn ? 'block' : 'hidden'
            } absolute bottom-4 left-0 w-full text-center uppercase text-black dark:text-white`}
          >
            Kao adminu, post će biti automatski odobren!
          </p>
        </form>

        <p className="text-black dark:text-white text-base sm:text-lg text-center">
          Pravila za objavljivanje sadržaja su 10 Božijih zapovesti!
        </p>
      </div>
    </div>
  )
}

export default CreatePost
