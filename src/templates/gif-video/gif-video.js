import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useInView } from "react-intersection-observer"
import style from './gif-video.module.less'

const GifVideo = ({ threshold = 0.15, ...playerProps }) => {
  const [ref, inView] = useInView({ threshold })

  useEffect(() => {
    if(ref.current){
      if (inView) {
        ref.current.play();
      } else {
        ref.current.pause()
      }
    }
  }, [ref, inView])

  return <div className={style.primaryContent}>
    <video 
      ref={ref}
      className={style.standardVideo}
      autoPlay playsInline muted loop 
      {...playerProps} />
    {playerProps.caption && <p className={style.caption}>{playerProps.caption}</p>}
  </div>
}


GifVideo.propTypes = {
  src: PropTypes.string,
  threshold: PropTypes.number,
  className: PropTypes.string,
}

export default GifVideo
