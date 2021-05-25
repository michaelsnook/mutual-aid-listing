import { StaticImage } from 'gatsby-plugin-image'
import PropTypes from 'prop-types'
import React from 'react'
import { Tag } from '.'

export const Hero = (props) => {
  const { description, tag, title } = props

  return (
    <div className="container py-6">
      <div className="flex relative rounded-md overflow-hidden bg-primary-400 h-96">
        <StaticImage
          src="../images/hero-banner.jpg"
          alt={title}
          layout="constrained"
          loading="eager"
          fadeIn={false}
        />

        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, rgba(16, 185, 129, 0.5) 40%, rgba(6, 95, 70, .9) 100%)',
          }}
        />

        {tag && (
          <span className="absolute top-0 right-0 text-sm text-white font-medium my-3 mr-1 tracking-wide">
            <Tag color="primary" text={tag} />
          </span>
        )}

        <div className="absolute bottom-0 inset-x-0 p-5 lg:p-6 text-white">
          <h1 className="text-2xl lg:text-4xl font-bold leading-tight">
            {title}
          </h1>
          {description && (
            <h3 className="text-lg font-medium md:w-2/3">{description}</h3>
          )}
        </div>
      </div>
    </div>
  )
}

Hero.propTypes = {
  description: PropTypes.string,
  tag: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}
