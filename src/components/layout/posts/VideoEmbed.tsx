import React from 'react'

type Props = {
  url: string
}

const VideoEmbed = ({ url }: Props) => {
  return (
    <div>
      <iframe
        width="853"
        height="480"
        src={url}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  )
}

export default VideoEmbed
