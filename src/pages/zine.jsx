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
        title="MutualAidIndia.com | The Zine"
        description="A curated list of opportunities to donate for COVID relief."
        image={data.hero.url}
      />
      <hr className="my-8 invisible lg:hidden" />
      <Hero image={data.hero} tag="#MAIZine" />

      <div className="container pt-2 mb-2 md:pt-4 md:mb-4 lg:pt-6 lg:mb-6">
        <div className="bg-secondary-100 shadow-md rounded-md pt-3 pb-5 px-8">
          <p className="my-2 text-md">
            In April 2021 the second wave of the Covid-19 pandemic decimated the
            healthcare infrastructure in India. Time, it felt, had gone mad.
          </p>
          <p className="my-2 text-md">
            But for many of us at MAI, time has always been a little strange in
            the ways it slips into our lives. We made a small book about our
            time. You can buy the digital book on Gumroad at a suggested price
            of $12 if you’re in India and $15, if you’re outside India.
          </p>
          <p className="my-2 text-md italic">
            100% of proceeds will be donated to a campaign supporting the trans
            community in Manipur with daily essentials.
          </p>
          <OutboundLink
            className="bg-urgent-600 my-4 block w-full md:w-max text-center shadow-sm rounded-md text-white text-xl px-8 py-2 mb-2 md:mb-0 hover:bg-urgent-400"
            href="https://artformutualaid.gumroad.com/"
          >
            Donate for the MAI&nbsp;Zine
          </OutboundLink>
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
    hero: file(relativePath: { eq: "zine-banner.jpg" }) {
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
