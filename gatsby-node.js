const path = require("path")

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMarkdownRemark {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `)

  const templatePath = path.resolve(`src/templates/post.js`)

  result.data.allMarkdownRemark.nodes.forEach(node => {
    createPage({
      path: node.frontmatter.slug,
      component: templatePath,
      context: {
        slug: node.frontmatter.slug,
      },
      defer: true,
    })
  })

  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })
}
