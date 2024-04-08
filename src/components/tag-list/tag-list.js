/* Vendor imports */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
/* App imports */
import style from './tag-list.module.less'
import Config from '../../../config'
import Utils from '../../utils'

const TagList = ({ tags }) => (
  <div className={style.tags}>
    {tags
      .filter((tag, index) => index === tags.indexOf(tag)) // Remove duplicate values
      .sort()
      .map(tag => {
        const tagPageUrl = Utils.resolvePageUrl(Config.pages.tag, tag);
        const tagData = Config.tags[tag]
        if (!tagData) {
          console.error(`Tag data for ${tag} not found`)
        }

        return (
          <Link to={tagPageUrl} key={tag}>
            {tagData?.name || Utils.capitalize(tag)} 
          </Link>
      )})
      }
  </div>
)

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default TagList
