import React, { useEffect } from "react"
import Slider from "react-slick";
import { useInView } from "react-intersection-observer"
import style from './slick-carousel.module.less'
import GifVideo from "../gif-video/gif-video";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slick-carousel.overrides.css";

const SlickCarousel = ({ settings, images, threshold = 0.15 }) => {
    
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


    return (
        <Slider {...settings} className={style.carouselOverrides}>
            {images.map((image, i) => (
                <div key={i}>
                    {image.src.endsWith("mp4") &&
                    <GifVideo src={image.src} caption={image.alt}/> ||
                    <img 
                        className={style.fillImage}
                        src={`${image.src}`} alt={`${image.alt}`}></img>}
                </div>
            ))}
        </Slider>
    );
}

SlickCarousel.propTypes = {
}

export default SlickCarousel;