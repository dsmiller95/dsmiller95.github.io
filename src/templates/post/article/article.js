/* Vendor imports */
import React from 'react'
import PropTypes from 'prop-types'
import 'prismjs/themes/prism-solarizedlight.css'
import './highlight-syntax.less'
/* App imports */
import style from './article.module.less'
import {MDXProvider} from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import GifVideo from '../../gif-video'
import SlickCarousel from '../../slick-carousel';
import CompareSlider from '../../compare-slider/compare-slider'

const Article = ({ mdxBody }) => {
  const shortCodes = {
    Video: GifVideo,
    SlickCarousel: SlickCarousel,
    CompareSlider: CompareSlider
  }
  return (
    <div className={style.container}>
      <MDXProvider components={shortCodes}>
          <MDXRenderer>{mdxBody}</MDXRenderer>
      </MDXProvider>
    </div>
  )
}

Article.propTypes = {
  mdxBody: PropTypes.string.isRequired,
}

export default Article
