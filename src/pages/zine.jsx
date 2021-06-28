import React from 'react'
import { graphql } from 'gatsby'
import { Hero, SiteMetadata, EntryCustom } from '../components'
import { Layout } from '../layouts/Layout'
import { OutboundLink } from 'gatsby-plugin-google-gtag'

const Zine = ({ data }) => {
  const properties = data.items.nodes[0].data

  return (
    <Layout>
      <SiteMetadata
        title="MutualAidIndia.com | The Zine"
        description="A curated list of opportunities to donate for COVID relief."
        image={data.hero.url}
      />
      <hr className="my-8 invisible lg:hidden" />
      <Hero image={data.hero} tag="#MAIZine" />

      <div className="lg:container px-2 sm:px-4 md:px-7 py-2 mb-2 md:pt-4 md:mb-4 lg:pt-6 lg:mb-6">
        <div className="bg-secondary-100 shadow-md rounded-md pt-6 pb-5 px-6 md:px-8 lg:px-10">
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
            href="https://gumroad.com/l/threewaysofunpeelingtime?utm_source=MutualAidIndia.com"
          >
            Donate for the MAI&nbsp;Zine
          </OutboundLink>
        </div>
      </div>

      <div className="lg:container px-2 sm:px-4 md:px-7 py-6">
        <EntryCustom
          {...properties}
          donate_text="Donate for the MAI Zine"
          donate_link="https://gumroad.com/l/threewaysofunpeelingtime?utm_source=MutualAidIndia.com"
        />
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
          UPI_ID
        }
      }
    }
  }
`
export default Zine
