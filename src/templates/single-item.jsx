import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import React, { useState } from 'react'
import { Feature, SiteMetadata, Tag, DonateLink, Progress } from '../components'
import { useModal } from '../context'
import { Layout } from '../layouts/Layout'
import { openUPIURL } from '../utils'
import { HomeIcon, CurrencyRupeeIcon } from '@heroicons/react/outline'

const SingleItem = (props) => {
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
    UPI_ID,
  } = data.item.data
  const navigation = location.state ? location.state.navigation : null
  const { modal } = useModal()
  const [isUPIPressed, setIsUPIPressed] = useState(false)

  return (
    <Layout navigation={navigation}>
      <SiteMetadata title={Name} description={Description} image={cover.url} />
      {!modal && (
        <nav className="shadow-lg z-40 p-5 sticky top-0 bg-white w-full">
          <div className="flex flex-row justify-between w-full">
            <Link
              to="/"
              className="flex focus:outline-none focus:ring focus:border-primary-300 rounded-sm"
            >
              <HomeIcon className="block h-6 w-6 text-primary-900 mr-2" />
              <span
                className="pt-0.5 inline-flex flex-shrink-0 relative h-6 mr-2
              text-primary-900 align-bottom"
              >
                Back to home
              </span>
            </Link>
          </div>
        </nav>
      )}
      <article className={modal && 'max-h-80vh md:max-h-90vh overflow-auto'}>
        <div className={modal ? 'p-4 lg:p-8' : 'container py-8'}>
          <h1 className="mb-3 text-2xl lg:text-3xl text-primary-500 font-bold leading-tight">
            {Name}
          </h1>
          <Progress reached={Rupees_Reached} goal={Rupees_Goal} />
          <div className="flex flex-wrap">
            <div className="w-full pb-4 lg:w-3/5 lg:pr-4 lg:pb-0">
              <Img fluid={cover.childImageSharp.fluid} alt={Name} />
            </div>
            <div className="w-full lg:w-2/5 lg:pl-4">
              {Status === 'Met Goal and Increased' && (
                <p className="mb-2">{<Tag color="yellow" text={Status} />}</p>
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
              {Category && <Feature label="Category" value={Category} />}
              {Region && <Feature label="Location" value={Region} />}
              {Bank_Details && (
                <>
                  <h4 className="text-primary-800 uppercase text-xxs tracking-wide font-medium pb-px mt-2">
                    Bank Details
                  </h4>
                  <p className="whitespace-pre-line text-sm lg:text-base leading-normal text-primary-900">
                    {Bank_Details}
                  </p>
                </>
              )}
              {Description && (
                <>
                  <h4 className="text-primary-800 uppercase text-xxs tracking-wide font-medium pb-px mt-2">
                    Description
                  </h4>
                  <div
                    className="airtable-markdown py-2 text-sm lg:text-base leading-normal text-primary-900"
                    dangerouslySetInnerHTML={{
                      __html: Description.childMarkdownRemark.html,
                    }}
                  />
                </>
              )}
              <div className="my-4 flex flex-wrap">
                {UPI_ID && (
                  <div className="sm:hidden flex flex-col mr-3 mb-2">
                    <button
                      className="cursor-pointer border border-secondary-600 text-center hover:shadow-lg shadow-md rounded-md text-secondary-600 text-lg px-5 py-2 hover:bg-secondary-600 hover:text-white"
                      onClick={() => {
                        openUPIURL(UPI_ID)
                        setIsUPIPressed(true)
                      }}
                    >
                      Donate via UPI{' '}
                      <CurrencyRupeeIcon className="inline h-4 w-4" />
                    </button>
                    {isUPIPressed && (
                      <span className="text-sm italic">
                        This option only works on certain devices
                      </span>
                    )}
                  </div>
                )}
                {URL && <DonateLink href={URL} />}
              </div>
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
        Description {
          childMarkdownRemark {
            html
          }
        }
        Name
        Image {
          localFiles {
            url: publicURL
            childImageSharp {
              fluid(
                srcSetBreakpoints: [400, 1080]
                maxWidth: 733
                maxHeight: 480
                cropFocus: NORTH
              ) {
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
        UPI_ID
      }
    }
  }
`

export default SingleItem
