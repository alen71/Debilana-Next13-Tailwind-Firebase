import { DocumentData } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import Navbar from '../components/layout/navbar/Navbar'
import InputCustom from '../components/shared/InputCustom'
import {
  userSignIn,
  userSignOut,
  getPosts
} from '../utils/firebase/firebase-utils'
import { IPost, PostsStatus } from '../utils/types/posts.types'
import useGetPosts from '../hooks/useGetPosts'
import useUserLogIn from '../store/useUserLogIn'
import MessagePopup from '../components/shared/MessagePopup'
import PendingPost from '../components/layout/posts/PendingPost'
import PageLayout from '../components/layout/PageLayout'

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
      ? 'bg-primary'
      : 'bg-primary-light pointer-events-none'

  const hideForm = loggedIn
    ? 'translate-x-[-500%] absolute w-full'
    : 'translate-x-0'

  const signIn = async (e: any) => {
    e.preventDefault()
    try {
      const user = await userSignIn(email, password)

      if (!user.accessToken) throw new Error()
    } catch (err) {
      setDisplayMessage({
        message: 'Password ili email nisu tačni!',
        open: true,
        type: false
      })
    }
  }

  const signOut = async () => {
    const loggedOut = await userSignOut()

    if (!loggedOut) return
  }

  return (
    <PageLayout hideSortTable>
      <MessagePopup
        isOpen={displayMessage.open}
        message={displayMessage.message}
        messageType={displayMessage.type}
        closeMessage={() =>
          setDisplayMessage({ ...displayMessage, open: false })
        }
      />

      <div className="px-5 md:px-0 pt-20 lg:pt-6  w-full md:w-[567px] 2xl:w-[700px] flex flex-col gap-6 relative">
        <form
          className={`${hideForm} w-full flex gap-5 flex-col rounded-md text-sm sm:text-base bg-transparent px-6 py-6 mb-6 transition-[position, transform] duration-700 shadow-container-shadow dark:shadow-none dark:border-[1px] dark:border-gray`}
          onSubmit={signIn}
        >
          <p className="text-base sm:text-lg text-center">Uloguj se</p>
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
          {loggedIn && posts.length === 0 && (
            <p className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-xl font-semibold">
              Lista je prazna
            </p>
          )}
          {loggedIn &&
            posts.map((post, index) => (
              <div key={post.id}>
                <PendingPost index={index} {...post} admin />
              </div>
            ))}
        </div>

        <button
          className={`${
            loggedIn ? 'translate-y-0' : 'translate-y-[-200px]'
          } px-8 py-1 w-fit rounded-full bg-gray text-black  absolute right-[0] lg:right-[-200px] top-6 transition-transform duration-500`}
          onClick={signOut}
        >
          logout
        </button>
      </div>
    </PageLayout>
  )
}

export default AdminLogin
