import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useUserLogIn from '../../../store/useUserLogIn'
import { userSignOut } from '../../../utils/firebase/firebase-utils'
import BackgroundBlur from '../../shared/BackgroundBlur'
import SortTable from '../SortTable'
import { cn } from '@/lib/utils/common'

type Props = {
  open: boolean
  toggle: () => void
}

const hamburgerLinks = [
  {
    href: '/',
    name: 'Novo'
  },
  {
    href: '/debilana/new',
    name: 'Debilana'
  },
  {
    href: '/gastarbajteri/new',
    name: 'Gastarbajteri'
  },
  {
    href: '/demokratija/new',
    name: 'demokratija'
  },
  {
    href: '/audio',
    name: 'audio'
  },
  {
    href: '/admin-page',
    name: 'Admin stranica'
  }
]

const HamburgerNavbar = ({ open, toggle }: Props) => {
  const { asPath } = useRouter()
  const { loggedIn } = useUserLogIn()
  const [height, setHeight] = useState(0)

  useEffect(() => {
    setHeight(window?.innerHeight - 71)

    window.addEventListener('resize', () => {
      setHeight(window?.innerHeight - 71)
    })

    return () => {
      window.removeEventListener('resize', () => {
        setHeight(window?.innerHeight - 71)
      })
    }
  }, [])

  return (
    <>
      <BackgroundBlur open={open} toggle={toggle} />
      <div
        className={cn(
          'w-full min-[450px]:w-[450px] transition-transform translate-duration-1000 z-20 fixed top-[71px] left-0  bg-white dark:bg-black py-5 block lg:hidden shadow-container-shadow dark:shadow-none overflow-y-auto',
          open ? 'translate-x-0' : 'translate-x-[-100%]'
        )}
        style={{
          height
        }}
      >
        <div className="w-full flex flex-col items-center min-h-screen">
          <div className="w-full border-y-[1px] divide-y-[1px] divide-gray dark:text-white text-center uppercase text-base mt-10 mb-4">
            {hamburgerLinks.map(({ href, name }) => (
              <Link
                key={name}
                href={href}
                className={`${
                  (asPath.includes(href) && href !== '/') ||
                  (href === '/' &&
                    !asPath.includes('/debilana') &&
                    !asPath.includes('/gastarbajter') &&
                    !asPath.includes('/demokratija') &&
                    !asPath.includes('/audio') &&
                    !asPath.includes('/admin-page'))
                    ? 'text-primary dark:text-primary'
                    : 'text-black dark:text-white'
                } cursor-pointer block py-2  hover:text-primary hover:dark:text-primary`}
                onClick={toggle}
              >
                {name}
              </Link>
            ))}
            {loggedIn && (
              <div
                className="cursor-pointer block py-2 hover:bg-gray-bg dark:hover:bg-gray-dark"
                onClick={() => {
                  toggle()
                  userSignOut()
                }}
              >
                Log out
              </div>
            )}
          </div>

          <SortTable toggle={toggle} />

          <div className="mt-10 text-lg mx-auto text-center">
            Kontaktirajte nas:{' '}
            <a
              href="mailto:debilana.info@gmail.com"
              className="text-primary underline"
            >
              debilana.info@gmail.com
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default HamburgerNavbar
