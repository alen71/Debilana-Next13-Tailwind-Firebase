import React from 'react'
import Navbar from '../components/layout/navbar/Navbar'

const audioLinks = [
  {
    name: 'Anchor',
    href: 'https://l.messenger.com/l.php?u=https%3A%2F%2Fanchor.fm%2Fdebilana-info&h=AT2MqBTCi1k85wQ2bMZXszNfiBefM3Mw0mHmpJdpyx7QAdtattwR6-lNGgypSZzFUVMJLhO6QJFMeBRx3BIczD5M0f37ordKppLAYr08qOiIJMCkZp3gGBRPGsnRDKG0FImEwg'
  },
  {
    name: 'Spotify',
    href: 'https://l.messenger.com/l.php?u=https%3A%2F%2Fopen.spotify.com%2Fshow%2F6WJtNNuVDZkEu1ULi5gyF9&h=AT2MqBTCi1k85wQ2bMZXszNfiBefM3Mw0mHmpJdpyx7QAdtattwR6-lNGgypSZzFUVMJLhO6QJFMeBRx3BIczD5M0f37ordKppLAYr08qOiIJMCkZp3gGBRPGsnRDKG0FImEwg'
  },
  {
    name: 'Podcast Apple',
    href: 'https://l.messenger.com/l.php?u=https%3A%2F%2Fpodcasts.apple.com%2Frs%2Fpodcast%2Fdebilana-info%2Fid1669242423&h=AT2MqBTCi1k85wQ2bMZXszNfiBefM3Mw0mHmpJdpyx7QAdtattwR6-lNGgypSZzFUVMJLhO6QJFMeBRx3BIczD5M0f37ordKppLAYr08qOiIJMCkZp3gGBRPGsnRDKG0FImEwg'
  },
  {
    name: 'Podcasts Google',
    href: 'https://l.messenger.com/l.php?u=https%3A%2F%2Fpodcasts.google.com%2Ffeed%2FaHR0cHM6Ly9hbmNob3IuZm0vcy9kYTJjMzkyNC9wb2RjYXN0L3Jzcw&h=AT2MqBTCi1k85wQ2bMZXszNfiBefM3Mw0mHmpJdpyx7QAdtattwR6-lNGgypSZzFUVMJLhO6QJFMeBRx3BIczD5M0f37ordKppLAYr08qOiIJMCkZp3gGBRPGsnRDKG0FImEwg'
  }
]

const audio = () => {
  return (
    <div className="h-[100svh]">
      <Navbar hideSortTable />

      <div className="mx-6 pt-6 md:mx-auto md:max-w-xl 2xl:max-w-[700px]">
        <div className="relative flex gap-5 flex-col rounded-md text-sm sm:text-base bg-white dark:bg-black px-6 pt-8 pb-14 mb-6 shadow-container-shadow dark:shadow-none dark:border-[1px] dark:border-gray">
          <h1 className="text-center font-bold text-3xl">
            Poslušajte ispovesti
          </h1>

          <div className="flex flex-col justify-between items-center mt-8 gap-5">
            {audioLinks.map(({ href, name }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer nofollow"
                className="block font-semibold text-primary text-lg border-[1px] border-primary rounded-full py-1 px-5 duration-300 hover:text-white hover:bg-primary"
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default audio
