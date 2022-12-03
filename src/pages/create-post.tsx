import React, { useState } from 'react'

import Navbar from '../components/layout/navbar/Navbar'
import ImageSvg from '../assets/image.svg'
import TextareaCustom from '../components/shared/TextareaCustom'

const CreatePost = () => {
  const [isTyping, setIsTyping] = useState(false)

  const checkTyping = (e: any) => {
    if (e.target.value.length > 0 && !isTyping) {
      setIsTyping(!isTyping)
    } else if (e.target.value.length === 0 && isTyping) {
      setIsTyping(!isTyping)
    }
  }

  console.log(isTyping)
  const typing = isTyping
    ? 'bg-gray-text-hover-dark dark:bg-black'
    : 'bg-gray-text-hover pointer-events-none'

  return (
    <div className="h-screen pt-[71px] pb-6 overflow-y-auto">
      <Navbar hideSortTable hideSearch hideNav />

      <div className="mx-6 md:mx-auto md:max-w-xl 2xl:max-w-[700px]">
        <p className="text-center text-xl sm:text-3xl mt-6 pb-2 sm:pb-4">
          Pravila za objavljivanje sadržaja su:
        </p>
        <p className="text-center font-bold uppercase text-3xl sm:text-5xl mb-6">
          10 božijih zapovesti
        </p>
        <h2 className="font-bold text-lg sm:text-2xl mb-6 capitalize pl-6">
          napravi objavu
        </h2>
        <form className="flex gap-5 flex-col rounded-md text-sm sm:text-base bg-main-gray dark:bg-gray-dark px-6 pt-8 pb-14 mb-6">
          <TextareaCustom
            rows={10}
            placeholder="* Napiši nešto..."
            name="Create post"
            required
            onChange={checkTyping}
          />
          <div>
            <p className="pb-2">
              Polje za dodavanje slike ili video snimka nije obavezno.
            </p>
            <div className="w-full  bg-white dark:bg-black rounded-md border-2 p-5 flex flex-col items-center">
              <ImageSvg className="lg:scale-125 dark:text-white" />
              <p className="mb-3 mt-6">
                Izaberi i postavi fotografiju ili video snimak
              </p>
              <button
                type="button"
                className="bg-light-yellow hover:bg-yellow text-black overflow-hidden rounded-full py-2 px-5 leading-[21px] relative"
              >
                Choose file...
                <input
                  type="file"
                  className="opacity-0 absolute top-0 left-0 w-full h-full z-20 cursor-pointer"
                />
              </button>
              <p className="py-3">ili</p>
              <input
                type="text"
                placeholder="Nalepi URL fotografije ili video snimka"
                className="bg-primary-light border-main-gray focus:border-black focus:dark:border-primary-dark focus:bg-main-gray dark:bg-gray-dark focus:placeholder:text-black focus:placeholder:dark:text-primary-dark w-full rounded-lg py-2 px-3 outline-none placeholder:text-gray-text-hover border-2 "
              />
              <p className="pt-3 text-center sm:text-left">
                Podržavamo linkove sa PNG, JPG, GIF or MP4 file.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-0 justify-between">
            <div className="relative flex items-center gap-4 ">
              <input
                type="checkbox"
                name="is visible"
                value="da"
                className="peer w-6 h-6 absolute left-[2px] top-[2px] opacity-0 cursor-pointer z-10"
              />
              <div className="w-7 h-7 border-2 block rounded-full "></div>
              <div className="w-4 h-4 rounded-full block bg-black dark:bg-white absolute top-[6px] left-[6px] invisible peer-checked:visible"></div>
              <p>Da li želiš da ostaneš anoniman?</p>
            </div>
            <button className={`${typing} px-8 py-1 rounded-full text-white `}>
              Postavi
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePost
