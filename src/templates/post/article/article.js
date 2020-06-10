/* Vendor imports */
import React from 'react'
import PropTypes from 'prop-types'
import 'prismjs/themes/prism-solarizedlight.css'
import './highlight-syntax.less'
/* App imports */
import style from './article.module.less'
import { MDXRenderer } from 'gatsby-plugin-mdx'

const Article = ({ mdxBody }) => (
  <div className={style.container}>
    <MDXRenderer>{mdxBody}</MDXRenderer>
  </div>
)

Article.propTypes = {
  mdxBody: PropTypes.string.isRequired,
}

export default Article
