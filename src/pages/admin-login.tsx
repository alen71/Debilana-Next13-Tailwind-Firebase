import { DocumentData } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import Navbar from '../components/layout/navbar/Navbar'
import Post from '../components/layout/posts/Post'
import InputCustom from '../components/shared/InputCustom'
import {
  adminSignIn,
  adminSignOut,
  getPosts
} from '../utils/firebase/firebase-utils'
import { IPost, PostsStatus } from '../utils/types/posts.types'
import useGetPosts from '../hooks/useGetPosts'
import useUserLogIn from '../store/useUserLogIn'
import MessagePopup from '../components/shared/MessagePopup'

const AdminLogin = () => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [posts, setPosts] = useState<IPost[]>([])
  const [displayMessage, setDisplayMessage] = useState({
    message: '',
    open: false,
    type: true
  })

  const { loggedIn } = useUserLogIn()

  const passwordTyping = (e: any) => {
    setPassword(e.target.value)
  }

  const emailTyping = (e: any) => {
    setEmail(e.target.value)
  }

  useEffect(() => {
    const getAdminPosts = async () => {
      if (!loggedIn) return
      const posts: any = await getPosts(PostsStatus.PENDING)
      setPosts(posts)
    }
    getAdminPosts()
  }, [loggedIn])

  const typing =
    password.length > 0 && email.length > 0
      ? 'bg-gray-text-hover-dark dark:bg-black'
      : 'bg-gray-text-hover pointer-events-none'

  const hideForm = loggedIn
    ? 'translate-x-[-500%] absolute w-full'
    : 'translate-x-0'

  const signIn = async (e: any) => {
    e.preventDefault()
    try {
      const user = await adminSignIn(email, password)

      if (!user.accessToken) throw new Error()
    } catch (err) {
      console.log('radil')
      setDisplayMessage({
        message: 'Password ili email nisu tačni!',
        open: true,
        type: false
      })
    }
  }

  const signOut = async () => {
    const loggedOut = await adminSignOut()

    if (!loggedOut) return
  }

  return (
    <div className="h-screen pb-6 overflow-y-auto ">
      <Navbar hideSortTable />

      <MessagePopup
        isOpen={displayMessage.open}
        message={displayMessage.message}
        messageType={displayMessage.type}
        closeMessage={() =>
          setDisplayMessage({ ...displayMessage, open: false })
        }
      />

      <div className="mx-6 pt-20 lg:pt-6 md:mx-auto md:max-w-xl 2xl:max-w-[700px] flex flex-col gap-6 relative">
        <form
          className={`${hideForm} flex gap-5 flex-col rounded-md text-sm sm:text-base bg-main-gray dark:bg-gray-dark px-6 py-6 mb-6 transition-[position, transform] duration-700`}
          onSubmit={signIn}
        >
          <p className="font-bold text-lg sm:text-2xl text-center">Uloguj se</p>
          <InputCustom
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={emailTyping}
          />
          <InputCustom
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={passwordTyping}
          />
          <button
            className={`${typing} px-8 py-1 w-fit ml-auto rounded-full text-white `}
          >
            Potvrdi
          </button>
        </form>
        <div className="h-fit">
          {loggedIn &&
            posts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  type: 'spring',
                  delay: (index + 1) / 2
                }}
              >
                <Post {...post} admin />
              </motion.div>
            ))}
        </div>

        <button
          className={`${
            loggedIn ? 'translate-y-0' : 'translate-y-[-200px]'
          } px-8 py-1 w-fit rounded-full bg-gray-text-hover-dark text-white dark:bg-gray-dark absolute right-[0] lg:right-[-150px] top-6 transition-transform duration-500`}
          onClick={signOut}
        >
          logout
        </button>
      </div>
    </div>
  )
}

export default AdminLogin
