import React from "react"
import PropTypes from "prop-types"

import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider"
import GifVideo from "../gif-video/gif-video"

const CompareSlider = ({ src1, src2, ...extraProps }) => {

  return <ReactCompareSlider
    itemOne={src1.endsWith("mp4") ? 
      <GifVideo src={src1} {...extraProps}/> :
      <ReactCompareSliderImage src={src1} alt="image 1"{...extraProps}/>}
    itemTwo={src2.endsWith("mp4") ?
      <GifVideo src={src2} {...extraProps}/> :
      <ReactCompareSliderImage src={src2} alt="image 1" {...extraProps}/>}
  /> 
  
}


CompareSlider.propTypes = {
  src1: PropTypes.string,
  src2: PropTypes.string,
  className: PropTypes.string,
}

export default CompareSlider
