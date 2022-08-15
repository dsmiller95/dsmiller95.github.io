const config = require('./config');
const utils = require('./src/utils');

module.exports = {
  resolve: `gatsby-plugin-feed-mdx`,
  options: {
    feeds: [
      {
        serialize: ({ query: { allMdx } }) => {
          return allMdx.edges.map(({ node }) => {
            const { siteUrl, pathPrefix, author } = config
            const { title, date, path, excerpt } = node.frontmatter
            return Object.assign({}, node.frontmatter, {
              title: title,
              description: excerpt,
              url: utils.resolveUrl(siteUrl, pathPrefix, path),
              guid: siteUrl + path + title,
              date: date,
              author: author,
              custom_elements: [
                { "content:encoded": node.body }
              ],
            })
          })
        },
        query: `
          {
            allMdx(
              limit: 10,
              sort: { order: DESC, fields: [frontmatter___date] }
            ) {
              edges {
                node {
                  body
                  frontmatter {
                    title
                    date
                    path
                    excerpt
                  }
                }
              }
            }
          }
        `,
        output: "/rss.xml",
        title: "Fraculation's Dev update feed",
      },
    ],
  },
}