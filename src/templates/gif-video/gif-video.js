import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useInView } from "react-intersection-observer"
import style from './gif-video.module.less'

const GifVideo = ({ threshold = 0.15, loop = true, className, ...playerProps }) => {
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

  return <div className={style.primaryContent + " " + className}>
    <video 
      ref={ref}
      className={style.standardVideo}
      autoPlay playsInline muted loop={loop}
      {...playerProps} />
    {playerProps.caption && <span className={style.caption}>{playerProps.caption}</span>}
  </div>
}


GifVideo.propTypes = {
  src: PropTypes.string,
  threshold: PropTypes.number,
  loop: PropTypes.bool,
  className: PropTypes.string,
}

export default GifVideo
