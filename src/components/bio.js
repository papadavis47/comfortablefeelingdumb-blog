/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <>
      <div className="bio">
        <StaticImage
          className="bio-avatar"
          layout="fixed"
          formats={["AUTO", "WEBP", "AVIF"]}
          src="../images/iceweasel.jpg"
          width={50}
          height={50}
          quality={95}
          alt="Profile picture"
        />
        {author?.name && (
          <p className="custom">
            A <strong>Programming Blog</strong> by{" "}
            <strong>{author.name}</strong> {author?.summary || null}
            {` `}
          </p>
        )}
      </div>
      <p className="custom-anchor">
        <a href={`https://twitter.com/${social.twitter}`}>
          Follow me on Twitter &nbsp;
        </a>
        <span role="img" aria-label="Emoji checkmark">
          ✅
        </span>
      </p>
    </>
  )
}

export default Bio
