import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import React from 'react'
import { Tag } from '.'

export const Hero = (props) => {
  const { description, image, tag, title } = props

  return (
    <div className="container py-6">
      <div className="flex relative rounded-md overflow-hidden bg-primary-400">
        <Img
          alt={title}
          className=""
          fadeIn={false}
          fixed={[
            { ...image.childImageSharp.desktop, media: `(min-width: 768px)` },
            { ...image.childImageSharp.mobile, media: `(max-width: 767px)` },
          ]}
        />

        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, rgba(16, 185, 129, 0.5) 40%, rgba(6, 95, 70, .9) 100%)',
          }}
        ></div>

        {tag && (
          <span className="absolute top-0 right-0 text-sm text-white font-medium my-3 mr-1 tracking-wide">
            {<Tag color="primary" text={tag} />}
          </span>
        )}

        <div className="absolute bottom-0 inset-x-0 p-5 lg:p-6 text-white">
          <h1 className="text-2xl lg:text-4xl font-bold leading-tight">
            {title}
          </h1>
          <h3 className="text-lg font-medium md:w-2/3">{description}</h3>
        </div>
      </div>
    </div>
  )
}

Hero.propTypes = {
  description: PropTypes.string.isRequired,
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    childImageSharp: PropTypes.shape({
      desktop: PropTypes.object.isRequired,
      mobile: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
  tag: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export const query = graphql`
  fragment HeroImageFragment on File {
    url: publicURL
    childImageSharp {
      mobile: fixed(
        width: 768
        height: 256
        quality: 80
        cropFocus: NORTH
        fit: COVER
      ) {
        ...GatsbyImageSharpFixed_withWebp
      }
      desktop: fixed(
        width: 1536
        height: 512
        quality: 85
        cropFocus: NORTH
        fit: COVER
      ) {
        ...GatsbyImageSharpFixed_withWebp
      }
    }
  }
`
