/* Vendor imports */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
/* App imports */
import Layout from '../components/layout'
import SEO from '../components/seo'
import Utils from '../utils'
import style from './index.module.less'
import { FaFileAlt } from 'react-icons/fa'

export const aboutPropTypes = {
  data: PropTypes.shape({
    profilePhoto: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired,
    skillIcons: PropTypes.object.isRequired,
    toolIcons: PropTypes.object.isRequired,
  }),
}

class About extends React.Component {
  static propTypes = aboutPropTypes

  render() {
    let { profilePhoto, skillIcons, toolIcons, resumes } = this.props.data
    return (
      <Layout>
        <SEO
          title="About"
          description="A brief summary of this blog"
          path=""
        />
        <div className={style.container}>
          <div>
            <div className={style.fullContent}>
              <h1>Fraculation LLC</h1>
              <h2>About</h2>
              <p>Fraculation is a single-person independent game development studio located at Milwaukee, Wisconsin.
                Our goal is to build highly replayable games and push the limits of what can be generated in real-time game engines.
                To achieve this, we specialize in <Link 
                  to={"/tag/procGen"}
                  className={style.inlineLink}
                  key={"procGen"}>
                  procedural generation
                </Link>, <Link 
                  to={"/tag/graphics"}
                  className={style.inlineLink}
                  key={"graphics"}>
                  graphical programming
                </Link>, and <Link 
                  to={"/tag/tooling"}
                  className={style.inlineLink}
                  key={"tooling"}>
                  editor tooling
                </Link> in the Unity game engine.
                </p>
                <p>
                  Check out our first game <Link 
                  to={"/blog/seeb-defender-project"}
                  className={style.inlineLink}
                  key={"seeb defender"}>
                  Seeb Defender
                </Link>! Which allows the player to breed plants with unique gameplay properties
                by simulating genetics, sunlight, and fluid flow.
                Join the <a 
                  href="https://discord.gg/a78gs33vk5"
                  className={style.inlineLink}
                  key={"seeb defender discord link"}>
                   Discord
                </a> to keep up to date with development and try out alpha builds.</p>
            </div>
            <h2>Dan Miller</h2>
            <div className={style.imagePanelContent}>
              <div className={style.photo}>
                <Img fluid={profilePhoto.childImageSharp.fluid} />
              </div>
              <div className={style.memberDesc}>
                <p>
                  I started out in web development working primarily with Angular,
                  C# backends, and cloud infrastructure for 4 years professionally. 
                  The past couple years I have been designing and developing games in 
                  Unity, carrying through my lifelong passion for games into creating them
                  
                  Optimizing real-time software and automating workloads have been
                  long time passions of mine, and I find much overlap with game
                  programming. In Unity specifically, utilizing the DOTS and Jobs 
                  systems to automate generation of new content and simulation fills
                  these niches fabulously. As well as building in-editor tooling to
                  speed up design workflows inside Unity.
                </p>
                <ResumeList edges={resumes.edges} />
              </div>
            </div>
            <br />
            <h2>Skills</h2>
            <ImageList edges={skillIcons.edges} />
            <h2>Tools</h2>
            <ImageList edges={toolIcons.edges} />
          </div>
        </div>
      </Layout>
    )
  }
}

export const resumeListPropTypes = {
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        name: PropTypes.string.isRequired,
        publicURL: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
}
class ResumeList extends React.Component {
  static propTypes = resumeListPropTypes

  render = () => (
    <div className={style.flexDuo}>
      {this.props.edges
        .sort((edgeA, edgeB) =>
          edgeA.node.name.toLowerCase() > edgeB.node.name.toLowerCase() ? 1 : -1
        )
        .map(({ node: { name, publicURL } }) => (
          <div className={style.flexTop} key={name}>
            <a href={publicURL}>
              <FaFileAlt size="30"/>
            </a>
            <a href={publicURL}>
              <div>{name}</div>
            </a>
          </div>
      ))}
    </div>
  )
}


export const imageListPropTypes = {
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        name: PropTypes.string.isRequired,
        childImageSharp: PropTypes.shape({
          fixed: PropTypes.object.isRequired,
        }).isRequired,
      }).isRequired,
    })
  ).isRequired,
}

class ImageList extends React.Component {
  static propTypes = imageListPropTypes

  render = () => (
    <div className={style.iconsContainer}>
      {this.props.edges
        .sort((edgeA, edgeB) =>
          edgeA.node.name.toLowerCase() > edgeB.node.name.toLowerCase() ? 1 : -1
        )
        .map(({ node: { name, childImageSharp } }) => (
          <div className={style.iconWrapper} key={name}>
            <Img
              fixed={childImageSharp.fixed}
              alt={name + ' logo'}
              title={name}
            />
            <label>
              {iconsNameMap[name] ? iconsNameMap[name] : Utils.capitalize(name)}
            </label>
          </div>
        ))}
    </div>
  )
}

export const query = graphql`
  {
    profilePhoto: file(name: { eq: "profile-photo" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
    skillIcons: allFile(filter: { dir: { regex: "/about/skills$/" } }) {
      edges {
        node {
          name
          childImageSharp {
            fixed(width: 50) {
              ...GatsbyImageSharpFixed_tracedSVG
            }
          }
        }
      }
    }
    toolIcons: allFile(filter: { dir: { regex: "/about/tools$/" } }) {
      edges {
        node {
          name
          childImageSharp {
            fixed(width: 50) {
              ...GatsbyImageSharpFixed_tracedSVG
            }
          }
        }
      }
    }
    resumes: allFile(filter: { dir: { regex: "/about/resumes$/" } }) {
      edges {
        node {
          name
          publicURL
        }
      }
    }
  }
`
// Use to set specific icons names
export const iconsNameMap = {
  css: 'CSS',
  html: 'HTML',
  jquery: 'JQuery',
  nodejs: 'Node.js',
  vuejs: 'Vue.js',
  gruntjs: 'Grunt.js',
}

export default About
