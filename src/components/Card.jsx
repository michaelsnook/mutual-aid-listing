import { graphql } from "gatsby"
import Img from "gatsby-image"
import { Link } from "gatsby-plugin-modal-routing"
import PropTypes from "prop-types"
import React from "react"
import { Feature } from "."

export const Card = (props) => {
  const {
    Region,
    Image: {
      localFiles: [cover],
    },
    Name,
    navigation,
    Slug,
    Summary,
    Urgent,
    Foreign_Funds,
  } = props

  return (
    <div className="bg-white h-full shadow-sm rounded-md overflow-hidden hover:bg-green-100">
      <Link to={`/${Slug}`} state={{ navigation }} asModal>
        <div className="bg-green-300">
          <Img fluid={cover.childImageSharp.fluid} alt={Name} />
        </div>

        <div className="p-5 pb-1">
          <h1 className="text-2xl text-green-500 font-bold leading-snug mb-2">
            {Name}
          </h1>

          { Urgent && <span className="bg-pink-600 shadow-sm rounded-md text-white px-3 py-1 mr-2">Urgent</span> }
          { Foreign_Funds && <span className="bg-green-900 shadow-sm rounded-md text-white px-3 py-1">£ $ €</span> }

          <p className="mt-2 text-base text-green-900 mb-5 font-medium">
            {Summary}
          </p>
          <Feature label="Location" value={Region} />
        </div>
      </Link>
    </div>
  )
}

Card.propTypes = {
  Region: PropTypes.string.isRequired,
  Image: PropTypes.shape({
    localFiles: PropTypes.array,
  }).isRequired,
  Name: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    current: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.string),
  }),
  Slug: PropTypes.string.isRequired,
  Summary: PropTypes.string,
  Urgent: PropTypes.bool,
  Foreign_Funds: PropTypes.bool,
}

Card.defaultProps = {
  navigation: {},
}

export const query = graphql`
  fragment CardImageFragment on AirtableField {
    localFiles {
      childImageSharp {
        fluid(maxWidth: 640, maxHeight: 420, cropFocus: NORTH) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
