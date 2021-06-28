import React from 'react'
import { graphql } from 'gatsby'
import { Hero, SiteMetadata, EntryCustom } from '../components'
import { Layout } from '../layouts/Layout'
import { OutboundLink } from 'gatsby-plugin-google-gtag'

const Mixtape2 = ({ data }) => {
  const properties = data.items.nodes[0].data

  return (
    <Layout>
      <SiteMetadata
        title="MutualAidIndia.com | Mixtape 2"
        description="A curated list of opportunities to donate for COVID relief."
        image={data.hero.url}
      />
      <hr className="my-8 invisible lg:hidden" />
      <Hero
        image={data.hero}
        tag="#MAIMixtape"
        title="Mixtape Vol. 2 is Here!"
      />

      <div className="lg:container px-2 sm:px-4 md:px-7 py-2 mb-2 md:pt-4 md:mb-4 lg:pt-6 lg:mb-6">
        <div className="bg-secondary-100 shadow-md rounded-md pt-6 pb-5 px-6 md:px-8 lg:px-10">
          <h1 class="text-2xl font-bold leading-tight">
            Mixtape Vol. 2 is Here!
          </h1>
          <ol className="my-2 text-md list-decimal pl-7">
            <li>
              Make a donation of at least USD 8 / INR 500 using the BandCamp
              link or the bank details given
            </li>
            <li>
              If you used a bank transfer, send the receipt/screenshot of your
              donation to{' '}
              <a
                className="text-primary-700 font-bold hover:text-primary-500"
                href="mailto:mixtapeformai@gmail.com"
              >
                MixtapeForMAI@gmail.com
              </a>
              , or{' '}
              <a
                className="text-primary-700 font-bold hover:text-primary-500"
                href="https://docs.google.com/forms/d/e/1FAIpQLSfvA4L_qTK6ySDhAR_KF3_a5ilziEVpttdoSxQq5-NLvqT24Q/viewform"
              >
                fill this form
              </a>
              , then we'll send you the bandcamp download code for the mixtape.
            </li>
          </ol>
          <p className="my-2">
            <OutboundLink
              className="text-primary-700 hover:text-primary-500 font-bold"
              href="https://maimixtape.bandcamp.com/releases"
            >
              Preview or purchase on Bandcamp
            </OutboundLink>{' '}
            or check out the campaign details below and make a donation!
          </p>
        </div>
      </div>

      <div className="lg:container px-2 sm:px-4 md:px-7 py-6">
        <EntryCustom
          {...properties}
          donate_text="Donate via BandCamp for MAI Mixtape Vol. 2"
          donate_link="https://maimixtape.bandcamp.com/releases"
          show_bank_details
          Bank_Details={`Name: BIPE TRUST
          Account Number: 6812868143
          IFSC: IDIB000J029
          Account Type: Current account
          `}
        />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query Mixtape2Query($tableName: String!) {
    hero: file(relativePath: { eq: "mixtape-2-square.jpg" }) {
      ...HeroImageFragment
    }
    items: allAirtable(
      filter: {
        table: { eq: $tableName }
        data: { Tags: { in: ["mixtape-2"] } }
      }
    ) {
      nodes {
        data {
          Region
          Name
          Rupees_Goal
          Rupees_Reached
          Urgent
          Status
          Category
          Category_Rank
          Description {
            childMarkdownRemark {
              html
            }
          }
          Bank_Details
          UPI_ID
        }
      }
    }
  }
`
export default Mixtape2
