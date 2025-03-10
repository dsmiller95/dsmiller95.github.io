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
import GifVideo from '../templates/gif-video'
import Obfuscate from 'react-obfuscate'
import Config from '../../config'






///////////////// utils



const VidOrImageProps = PropTypes.shape({
  extension: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  publicURL: PropTypes.string.isRequired,
  childImageSharp: PropTypes.shape({
    fluid: PropTypes.object,
    fixed: PropTypes.object,
  }),
});

function vidOrImage(src, classNameInput, title) {
  if(src.extension === 'mp4') {
    return <div
      className={classNameInput}
    >
      <video 
        autoPlay playsInline muted loop={true}
        src={src.publicURL}
      />
    </div>
  }
  if(src.childImageSharp.fluid) {
    return <Img
      className={classNameInput}
      fluid={src.childImageSharp.fluid}
      alt={src.name}
      title={title}
    />
  }
  if(src.childImageSharp.fixed) {
    return <Img
      className={classNameInput}
      fixed={src.childImageSharp.fixed}
      alt={src.name}
      title={title}
    />
  }
  throw new Error("Invalid src object: " + src);
};


/////////////////



export const aboutPropTypes = {
  data: PropTypes.shape({
    profilePhoto: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired,
    titleAnimation: PropTypes.shape({
      extension: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      publicURL: PropTypes.string.isRequired,
    }),
    skillIcons: PropTypes.object.isRequired,
    toolIcons: PropTypes.object.isRequired,
    workShowcase: PropTypes.object.isRequired,
    projects: PropTypes.object.isRequired,
  }),
}

class About extends React.Component {
  static propTypes = aboutPropTypes

  render() {
    let { profilePhoto, titleAnimation, skillIcons, toolIcons, resumes, workShowcase, projects } = this.props.data
        return (
      <Layout>
        <SEO
          title="About"
          description="A brief summary of this blog"
          path=""
        />
        <div className={style.container}>
          <div className={style.textContainerPanel}>
            <div className={style.fullContent}>
              <div className={style.titleImageHeader}>
                <video
                  autoPlay playsInline muted loop={true}
                  src={titleAnimation.publicURL}
                />
              </div>
              {/* TODO: add a link to a projects listing page */}
              {/* <h4>Seeb Defender</h4>
              <p>
                  Check out our upcoming game on Steam: <a
                  href="https://store.steampowered.com/app/2362660/Seeb_Defender/"
                  className={style.inlineLink}
                  key={"seeb defender steam link"}>Seeb Defender</a>! 
                  Breed plants with unique gameplay mechanics by simulating genetics, sunlight, and fluid flow.
                Join the <a 
                  href="https://discord.gg/a78gs33vk5"
                  className={style.inlineLink}
                  key={"seeb defender discord link"}>
                   Discord
                </a> to keep up to date with development and try out alpha builds.</p>
                
                <iframe src="https://store.steampowered.com/widget/2362660/" frameborder="0" width="100%" height="190"></iframe> */}
              <h4>Fraculation LLC</h4>
              <p>Fraculation LLC is a software development freelancer located in Milwaukee, Wisconsin.
                My goal is to and push the limits of making both software and frames fast.
                To achieve this, I specialize in <Link 
                  to={"/tagprocGen"}
                  className={style.inlineLink}
                  key={"procGen"}>
                  procedural generation
                </Link>, <Link 
                  to={"/taggraphics"}
                  className={style.inlineLink}
                  key={"graphics"}>
                  graphical programming
                </Link>, <Link 
                  to={"/tagtooling"}
                  className={style.inlineLink}
                  key={"tooling"}>
                  editor tooling
                </Link> in the Unity game engine, and <Link 
                  to={"/tagtdd"}
                  className={style.inlineLink}
                  key={"tdd"}>
                  test driven develpment
                </Link>
                . For business inquiries, contact <Obfuscate
                  email={Config.social.email}
                  className={style.inlineLink}
                  headers={{
                    subject: 'Business Inquiry',
                  }}
                >
                  Dan Miller
                </Obfuscate>
              </p>
            </div>
            <h2>Dan Miller</h2>
            <div className={style.imagePanelContent}>
              <div className={style.photo}>
                <Img fluid={profilePhoto.childImageSharp.fluid} />
              </div>
              <div className={style.memberDesc}>
                <p>
                  Most recently a lead software engineer at financial startup Dispute and founder of Fraculation LLC.
                  I have 9 years of professional experience and have been writing code since 2010. My most recent experience
                  is leading the development of a real-time financial dispute resolution platform built with C# and dotnet.
                  Before that, I taught myself real-time application development in C# and Rust, and even earlier I was
                  a full-stack developer in C# and Angular across both AWS and Azure.
                </p><p>
                  Expert in C#, Unity, Terraform, Dotnet, and Typscript. Currently learning Vim, Rust, and Game Development. 
                  Looking to solve complex and meaningful problems with a team that values autonomy and creativity.
                  Ideally working in performance-critical and/or high scale contexts on the Individual Contributor track.
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
          <div className={style.projectsContainerPanel}>
            <h2>Projects</h2>
            <ProjectShowcaseList nodes={projects.nodes} />
            <h2>Systems</h2>
            <WorkShowcaseList nodes={workShowcase.nodes} />
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

export const workShowcasePropTypes = {
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
        frontmatter: PropTypes.shape({
          title: PropTypes.string.isRequired,
          path: PropTypes.string.isRequired,
          tags: PropTypes.arrayOf(
            PropTypes.string.isRequired
          ),
          projectImages: PropTypes.arrayOf(
            PropTypes.shape({
              description: PropTypes.string.isRequired,
              src: VidOrImageProps.isRequired,
            })
          )
        }),
      }).isRequired,
  ).isRequired,
}

class WorkShowcaseList extends React.Component {
  static propTypes = workShowcasePropTypes

  render = () => {
    var allImages = this.props.nodes
      .filter(node => (node.frontmatter.projectImages?.length ?? 0) > 0)
      .sort((nodeA, nodeB) =>
        nodeA.frontmatter.title.toLowerCase() > nodeB.frontmatter.title.toLowerCase() ? 1 : -1
      )
      .flatMap(node => 
        node.frontmatter.projectImages.map(projectImg => ({
          title: node.frontmatter.title,
          path: node.frontmatter.path,
          tags: node.frontmatter.tags,
          ...projectImg
        }))
      );

    var mediaClassname = (align) => {
      if(align == null || style[align] == null) return style.imageShowcaseMedia;
      return style.imageShowcaseMedia + " " + style[align];
    }
    
    return (
    <div className={style.imageShowcaseContainer}>
      {allImages
        .map(({ src, description, path, align  }) => (
          <Link 
            to={Utils.resolvePageUrl(path)}
            className={style.imageShowcaseWrapper}
            key={src.name + description}>
            <div className={style.imageShowcaseWrapperTwo}>
              {vidOrImage(src, mediaClassname(align), description)}
              <label>
                {Utils.capitalize(description)}
              </label>
            </div>
          </Link>
        ))}
    </div>
  );
        }
}



export const projectShowcasePropTypes = {
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      post: PropTypes.string,
      date: PropTypes.string.isRequired,
      developmentTime: PropTypes.string.isRequired,
      rank: PropTypes.number,
      totalEntries: PropTypes.number,
      links: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        title: PropTypes.string,
        comment: PropTypes.string,
        hidden: PropTypes.bool,
      })).isRequired,
      preview: PropTypes.shape({
        src: VidOrImageProps.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
}

class ProjectShowcaseList extends React.Component {
  static propTypes = projectShowcasePropTypes

  render = () => {
    var mediaClassname = (align) => {
      if(align == null || style[align] == null) return style.imageShowcaseMedia;
      return style.imageShowcaseMedia + " " + style[align];
    }

    var externalLink = (url, content, classname = null) => {
      return <a 
          href={url}
          className={classname ?? style.subLink}
        >{content}</a>
    }

    var internalLink = (path, content, classname = null) => {
      return <Link 
        to={Utils.resolvePageUrl(path)}
        className={classname ?? style.subLink}
        >{content}</Link>
    }

    var descriptiveText = (text) => {

    };

    var linkType = (links, linkType) => {
      var foundLink = links.find(link => link.type === linkType && !link.hidden);
      if(!foundLink) return null;
      return externalLink(foundLink.url, foundLink.title);
    }

    var postLink = (post) => {
      if(!post) return null;
      return internalLink(post, "Read More");
    }

    var bestLink = (post, links, classname, content) => {
      var gameLink = links.find(link => link.type === "Game" && !link.hidden);
      var githubLink = links.find(link => link.type === "Github" && !link.hidden);
      var foundExternalLink = gameLink?.url ?? githubLink?.url;
      if(foundExternalLink){
        return externalLink(foundExternalLink, content, classname);
      }
      return internalLink(post, content, classname);
    }

    var nodes = this.props.nodes;
    //nodes.sort((a, b) => a.date < b.date);


    var dateFormat = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: "long",
    })
    var formatDate = (dateString) => {
      var date = new Date(dateString);
      return dateFormat.format(date); 
    }

    var percentileFormat = new Intl.NumberFormat('en-US', {
      style: 'percent'
    });

    var rankingDescription = (rank, totalEntries) => {
      if(rank == null || totalEntries == null) return null;
      var percentile = rank / totalEntries;
      var percentileString = percentileFormat.format(percentile);
    
      return `Top ${percentileString}`;
    }

    return (
    <div className={style.imageShowcaseContainer}>
      {nodes
        .map(({ preview: {src}, links, title, post, date, developmentTime, rank, totalEntries }) => {
          var rankDesc = rankingDescription(rank, totalEntries);
          return (
            <div
              className={style.imageShowcaseWrapper}
              key={src.name + title}
            >
              <div className={style.imageShowcaseWrapperTwo}>
                {bestLink(post, links, style.imageLink,
                  vidOrImage(src, mediaClassname(null), title)
                )}
                <span className={style.subTitle}>
                  {Utils.capitalize(title)}
                </span>
                <span className={style.subInfo}>
                  {formatDate(date) + ", " + developmentTime}
                </span>
                {rankDesc ?? 
                  <span className={style.subInfo}>
                    {rankDesc}
                  </span>
                }
                {linkType(links, "Game")}
                {linkType(links, "Github")}
                {postLink(post)}
              </div>
            </div>
          )
        })}
    </div>
  );
        }
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
    titleAnimation: file(name: { eq: "fraculation-llc-animation" }) {
      extension
      name
      publicURL
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
    workShowcase: allMdx{
        nodes {
          frontmatter {
            title
            tags
            path
            projectImages {
              description
              align
              src {
                extension
                name
                publicURL
                childImageSharp {
                  fluid(maxWidth: 1920, maxHeight: 1080) {
                    ...GatsbyImageSharpFluid_noBase64
                    ...GatsbyImageSharpFluidLimitPresentationSize
                  }
                }
              }
            }
          }
        }
    }
    projects: allProjectsJson(sort: {fields: date, order: DESC}) {
      nodes {
        title
        post
        date
        developmentTime
        rank
        totalEntries
        links {
          comment
          hidden
          type
          url
          title
        }
        preview {
          src {
            extension
            name
            publicURL
            childImageSharp {
              fluid(maxWidth: 312, maxHeight: 250) {
                ...GatsbyImageSharpFluid_noBase64
                ...GatsbyImageSharpFluidLimitPresentationSize
              }
            }
          }
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
