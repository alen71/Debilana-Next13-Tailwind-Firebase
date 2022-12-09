import React from 'react'
import ReactPlayer from 'react-player'

type Props = {
  url: string
}

const VideoEmbed = ({ url }: Props) => {
  return (
    <div>
      <ReactPlayer
        // width="853"
        // height="480"
        url={url}
        // frameBorder="0"
        // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        // allowFullScreen
        // title="Embedded youtube"
      />
    </div>
  )
}

export default VideoEmbed
