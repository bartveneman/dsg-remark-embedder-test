module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-embedder",
            options: {
              customTransformers: [
                {
                  // We're overriding the default Youtube embedder here to replace
                  // the default iframe with a more performant alternative
                  name: "Youtube Lite",
                  // A straight copy from https://github.com/MichaelDeBoey/gatsby-remark-embedder/blob/a92d054ad08783ab5bc41b3ef03f0109eaa5ca4c/src/transformers/YouTube.js#L1-L10
                  shouldTransform: url => {
                    const { host, pathname, searchParams } = new URL(url)
                    return (
                      host === "youtu.be" ||
                      (["youtube.com", "www.youtube.com"].includes(host) &&
                        pathname.includes("/watch") &&
                        Boolean(searchParams.get("v")))
                    )
                  },
                  // Instead of an iframe we return the Custom Element here that's more performant
                  getHTML: urlString => {
                    const url = new URL(urlString)
                    const id =
                      url.host === "youtu.be"
                        ? url.pathname.slice(1)
                        : url.searchParams.get("v")
                    return `<lite-youtube videoid="${id}" nocookie></lite-youtube>`
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
}
