import { User } from 'firebase/auth'
import { create } from 'zustand'

type UserLoggedIn = {
  loggedIn: User | null
  setLoggedIn: (loggedIn: User | null) => void
}

const useUserLogIn = create<UserLoggedIn>(set => ({
  loggedIn: null,
  setLoggedIn: loggedIn =>
    set(() => ({
      loggedIn: loggedIn
    }))
}))

export default useUserLogIn
