import { graphql } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import { Feature, SiteMetadata } from "../components"
import { useModal } from "../context"
import { Layout } from "../layouts/Layout"
import { showCurrency } from "../utils"

export default (props) => {
  const { data, location } = props
  const {
    Region,
    Description,
    Image: {
      localFiles: [cover],
    },
    Name,
    Rupees_Goal,
    Rupees_Reached,
    Category,
    URL,
    Urgent,
    Foreign_Funds,
    Bank_Details,
  } = data.item.data
  const navigation = location.state ? location.state.navigation : null
  const { modal } = useModal()

  return (
    <Layout navigation={navigation}>
      <SiteMetadata title={Name} description={Description} image={cover.url} />
      <article className={modal && "max-h-80vh md:max-h-90vh overflow-auto"}>
        <div className={modal ? "p-4 lg:p-8" : "container py-8"}>
          <h1 className="text-2xl lg:text-3xl text-primary-500 font-bold leading-tight">
            {Name}
          </h1>
          <p className="text-base lg:text-lg text-primary-800 font-medium mb-4">
            {showCurrency(Rupees_Reached, 'rupees')} of {showCurrency(Rupees_Goal, 'rupees')}
          </p>
          <div className="flex flex-wrap">
            <div className="w-full pb-4 lg:w-3/5 lg:pr-4 lg:pb-0">
              <Img fluid={cover.childImageSharp.fluid} alt={Name} />
            </div>
            <div className="w-full lg:w-2/5 lg:pl-4">
              {Urgent && (
                <p className="mb-2">
                  <span className="bg-gradient-to-r from-urgent-700 to-urgent-500 shadow-sm rounded-md text-white px-3 py-1 mr-2">
                    Urgent
                  </span>
                </p>
              )}
              {Foreign_Funds && (
                <p className="mb-2">
                  <span className="bg-gradient-to-r from-primary-700 to-primary-500 shadow-sm rounded-md text-white px-3 py-1 mr-2">
                    £ $ €
                  </span>
                  <span className="text-primary-900">
                    This campaign is able to accept foreign contributions.
                  </span>
                </p>
              )}
              <Feature label="Location" value={Region} />
              <Feature label="Category" value={Category} />
              <Feature label="To Donate" value={URL} />
              {Bank_Details && (
                <p className="whitespace-pre-line text-sm lg:text-base leading-normal text-primary-900">
                  {Bank_Details}
                </p>
              )}
              <p className="mt-4 whitespace-pre-line text-sm lg:text-base leading-normal text-primary-900">
                {Description}
              </p>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query SingleItemQuery($Slug: String!) {
    item: airtable(data: { Slug: { eq: $Slug } }) {
      data {
        Region
        Description
        Name
        Image {
          localFiles {
            url: publicURL
            childImageSharp {
              fluid(maxWidth: 733, maxHeight: 480, cropFocus: NORTH) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        Slug
        Rupees_Reached
        Rupees_Goal
        Category
        URL
        Urgent
        Foreign_Funds
        Bank_Details
      }
    }
  }
`
