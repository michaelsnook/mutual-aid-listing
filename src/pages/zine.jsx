import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { Entry, Hero, SiteMetadata } from '../components'
import { Layout } from '../layouts/Layout'
import { Nav } from '../components'
import { OutboundLink } from 'gatsby-plugin-google-gtag'

const Zine = ({ data }) => {
  const [isForeignDonor, setIsForeignDonor] = useState(false)

  const nodes = data.items.nodes.filter(
    (node) => node.data.Foreign_Funds === true || isForeignDonor === false
  )

  return (
    <Layout>
      <SiteMetadata
        title="MutualAidIndia.com | Mixtape"
        description="A curated list of opportunities to donate for COVID relief."
        image={data.hero.url}
      />
      <hr className="my-8 invisible lg:hidden" />
      <Hero image={data.hero} tag="#MAIMixtape" />

      <div className="container pt-2 mb-2 md:pt-4 md:mb-4 lg:pt-6 lg:mb-6">
        <div className="bg-secondary-100 shadow-md rounded-md pt-3 pb-5 px-8">
          <p className="my-2 text-md">
            Thanks to our rad musician friends we now have a Mutual Aid India
            Mixtape, available on Bandcamp when you donate to one of the
            fundraisers below.
          </p>
          <ol className="my-2 text-md list-decimal pl-7">
            <li>
              Make a donation of at least USD 8 / INR 500 to one or more of the
              campaigns on this page.
            </li>
            <li>
              Send the receipt/screenshot of your donation to{' '}
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
              .
            </li>
            <li>
              Then we'll send you the bandcamp download code for the mixtape.
            </li>
          </ol>
          <p className="my-2">
            <OutboundLink
              className="text-primary-700 hover:text-primary-500 font-bold"
              href="https://maimixtape.bandcamp.com/releases"
            >
              Preview on Bandcamp
            </OutboundLink>{' '}
            or check out the campaigns below and get started!
          </p>
        </div>
      </div>

      <div className="lg:container grid grid-cols-4">
        <div className="col-span-4 lg:col-span-1 lg:py-10 py-4">
          <Nav isToggled={isForeignDonor} setToggled={setIsForeignDonor} />
        </div>

        <div className="lg:col-start-2 col-span-4 px-1 sm:px-3 md:px-5 lg:px-8 ml-0">
          {nodes.map((node, i) => (
            <div
              className="mb-10 pt-8 pb-6 md:pt-10 lg:pt-12 px-4 md:px-8 lg:px-10 bg-white shadow-md rounded-md"
              id={`track_${i}`}
              key={`card_${node.data.Slug}`}
            >
              <h4 className="text-primary-800 uppercase text-sm tracking-wide font-medium pb-px">
                {node.data.Category}
              </h4>
              <Entry
                {...node.data}
                navigation={{
                  current: i,
                  items: nodes.map((node) => `/${node.data.Slug}`),
                }}
                isForeignDonor={isForeignDonor}
                current={i}
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ZineQuery($tableName: String!) {
    hero: file(relativePath: { eq: "mixtape-banner.jpg" }) {
      ...HeroImageFragment
    }
    items: allAirtable(
      filter: { table: { eq: $tableName }, data: { Tags: { in: ["zine"] } } }
    ) {
      nodes {
        data {
          Region
          Name
          Slug
          Rupees_Goal
          Rupees_Reached
          Urgent
          Status
          Foreign_Funds
          Category
          Category_Rank
          Description {
            childMarkdownRemark {
              html
            }
          }
          URL
          UPI_ID
        }
      }
    }
  }
`
export default Zine
