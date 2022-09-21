import React from "react"
import { graphql } from "gatsby"

export const query = graphql`
  query Post {
    markdownRemark(frontmatter: {title: {eq: "Test"}}) {
      html
    }
  }
`

const Post = ({ data }) => {
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

export default Post
