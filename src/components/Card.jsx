import { graphql } from "gatsby"
import Img from "gatsby-image"
import { Link } from "gatsby-plugin-modal-routing-3"
import PropTypes from "prop-types"
import React from "react"
import { Feature, Tag } from "."
import { showCurrency } from "../utils"

export const Card = (props) => {
  const {
    Region,
    Image: {
      localFiles: [cover],
    },
    Name,
    navigation,
    Slug,
    Status,
    Rupees_Goal,
    Rupees_Reached,
    Urgent,
    Foreign_Funds,
    isForeignDonor = false,
  } = props

  return (
    <div className="bg-white h-full shadow-sm rounded-md overflow-hidden hover:bg-primary-100">
      <Link to={`/${Slug}`} state={{ navigation }} asModal>
        <div className="bg-primary-300 relative">
          <Img fluid={cover.childImageSharp.fluid} alt={Name} />
          {Status === "Met Goal and Increased" && (
            <span className="absolute top-0 right-0 text-sm text-white font-medium my-3 mr-1 tracking-wide">
              {<Tag color="yellow" text={Status} />}
            </span>
          )}
        </div>

        <div className="p-5 pb-1">
          <h1 className="text-2xl text-primary-600 font-bold leading-snug mb-2">
            {Name}
          </h1>

          {Urgent && <Tag color="urgent" text="Urgent" />}
          {Foreign_Funds && <Tag color="secondary" text="£ $ €" />}

          {Rupees_Reached > 0 && (
            <p className="mt-2 text-base text-primary-900 mb-5 font-medium">
              {showCurrency(
                Rupees_Reached,
                isForeignDonor ? "dollars" : "rupees"
              )}{" "}
              raised
              {Rupees_Goal > 0
                ? ` of ${showCurrency(
                    Rupees_Goal,
                    isForeignDonor ? "dollars" : "rupees",
                    true
                  )}`
                : " so far"}
            </p>
          }
          {Region &&
            <Feature label="Location" value={Region} />
          }
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
  Rupees_Goal: PropTypes.number,
  Rupees_Reached: PropTypes.number,
  Urgent: PropTypes.bool,
  Foreign_Funds: PropTypes.bool,
  isForeignDonor: PropTypes.bool,
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
