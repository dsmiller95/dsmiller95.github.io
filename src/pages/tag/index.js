/* Vendor imports */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
/* App imports */
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import Config from '../../../config'
import Utils from '../../utils'
import style from './tag.module.less'

const Tag = ({ data }) => {
  const rawTags = data.allMdx.edges
    .map(edge => edge.node.frontmatter.tags)
    .reduce((prev, curr) => prev.concat(curr))
  const tags = rawTags
    .filter((tag, index) => index === rawTags.indexOf(tag))
    .sort() // Remove duplicates and sort values
  const tagPage = Config.pages.tag

  return (
    <Layout title="Tags">
      <SEO
        title="Tags"
        description="All present tags in the site"
        path={tagPage}
      />
      <div>
        {tags.map(tag => {
          const tagImage = data.allFile.edges.find(edge => edge.node.name === tag);
          if (!tagImage) {
            console.error(`Tag image for ${tag} not found`);
          }
          let tagComponent = null;
          if(tagImage){
            tagComponent = <Image fluid={tagImage.node.childImageSharp.fluid} />
          }
          let tagData = Config.tags[tag];
          if (!tagData) {
            console.error(`Tag data for ${tag} not found`);
            tagData = { name: Utils.capitalize(tag), description: ''};
          }

          return (
          <Link
            to={Utils.resolvePageUrl(tagPage, tag)}
            className={style.card}
            key={tag}
          >
            <div className={style.cover}>
              {tagComponent ?? <div />}
            </div>
            <div className={style.content}>
              <h2>{tagData.name || Utils.capitalize(tag)}</h2>
              <p>{tagData.description}</p>
              <label>{`${
                rawTags.filter(sTag => sTag === tag).length
              } Posts`}</label>
            </div>
          </Link>
        )})}
      </div>
    </Layout>
  )
}

Tag.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
            }).isRequired,
          }).isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired,
    allFile: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            name: PropTypes.string.isRequired,
            childImageSharp: PropTypes.shape({
              fluid: PropTypes.object.isRequired,
            }).isRequired,
          }).isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired,
  }).isRequired,
}

export const query = graphql`
  {
    allMdx(filter: { fileAbsolutePath: { regex: "/index.mdx?$/" } }) {
      edges {
        node {
          frontmatter {
            tags
          }
        }
      }
    }
    allFile(filter: { relativeDirectory: { eq: "tags" } }) {
      edges {
        node {
          name
          childImageSharp {
            fluid(maxWidth: 400) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`

export default Tag
