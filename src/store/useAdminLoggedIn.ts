import create from 'zustand'

type AdminLoggedIn = {
  loggedIn: boolean
  setLoggedIn: (loggedIn: boolean) => void
}

const useAdminLoggedIn = create<AdminLoggedIn>(set => ({
  loggedIn: false,
  setLoggedIn: loggedIn =>
    set(() => ({
      loggedIn: loggedIn
    }))
}))

export default useAdminLoggedIn
