import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import { Feature, SiteMetadata, Tag } from "../components"
import { useModal } from "../context"
import { Layout } from "../layouts/Layout"
import { showCurrency } from "../utils"
import { HomeIcon } from '@heroicons/react/outline'


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
    Status,
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
      {!modal &&
        <nav className="shadow-lg z-40 p-5 sticky top-0 bg-white w-full">
          <div className="flex flex-row justify-between w-full">
            <Link to="/" className="flex focus:outline-none focus:ring focus:border-primary-300 rounded-sm">
              <HomeIcon className="block h-6 w-6 text-primary-900 mr-2" />
              <span className="pt-0.5 inline-flex flex-shrink-0 relative h-6 mr-2
              text-primary-900 align-bottom">Back to home</span>
            </Link>
          </div>
        </nav>
      }
      <article className={modal && "max-h-80vh md:max-h-90vh overflow-auto"}>
        <div className={modal ? "p-4 lg:p-8" : "container py-8"}>
          <h1 className="text-2xl lg:text-3xl text-primary-500 font-bold leading-tight">
            {Name}
          </h1>
          <p className="text-base lg:text-lg text-primary-800 font-medium mb-4">
          {showCurrency(Rupees_Reached, 'rupees')} of {showCurrency(Rupees_Goal, 'rupees', true) + ' '}
          (about {showCurrency(Rupees_Reached, 'dollars')} of {showCurrency(Rupees_Goal, 'dollars', true)})
          </p>
          <div className="flex flex-wrap">
            <div className="w-full pb-4 lg:w-3/5 lg:pr-4 lg:pb-0">
              <Img fluid={cover.childImageSharp.fluid} alt={Name} />
            </div>
            <div className="w-full lg:w-2/5 lg:pl-4">

              {Status === 'Met Goal and Increased' && (
                <p className="mb-2">
                  { <Tag color="yellow" text={Status} /> }
                </p>
              )}
              {Urgent && (
                <p className="mb-2">
                  <Tag color="urgent" text="Urgent" />
                </p>
              )}
              {Foreign_Funds && (
                <p className="mb-2">
                  <Tag color="secondary" text="£ $ €" />
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
        Status
        URL
        Urgent
        Foreign_Funds
        Bank_Details
      }
    }
  }
`
