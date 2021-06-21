import React from 'react'
import { graphql } from 'gatsby'
import { Hero, SiteMetadata, Feature, Tag, Progress } from '../components'
import { Layout } from '../layouts/Layout'
import { OutboundLink } from 'gatsby-plugin-google-gtag'

const CustomEntry = (props) => {
  const {
    Region,
    Name,
    Category,
    Status,
    Rupees_Goal,
    Rupees_Reached,
    Urgent,
    Foreign_Funds,
    isForeignDonor = true,
    Description,
  } = props

  return (
    <div className="mb-10 bg-white shadow-md rounded-md">
      <div className="pt-8 pb-6 md:pt-10 lg:pt-12 px-6 md:px-8 lg:px-10">
        <h4 className="text-primary-800 uppercase text-sm tracking-wide font-medium pb-px">
          {Category}
        </h4>
        <div className="overflow-x-hidden">
          <h2 className="text-3xl text-primary-600 font-bold leading-snug mb-2">
            {Name}
          </h2>
          <Progress
            reached={Rupees_Reached}
            goal={Rupees_Goal}
            isForeignDonor={isForeignDonor}
          />
          {Urgent && <Tag color="urgent" text="Urgent" />}
          {Foreign_Funds && <Tag color="secondary" text="£ $ €" />}
          {Status === 'Met Goal and Increased' && (
            <Tag color="yellow" text={Status} />
          )}
          {Status === 'Met Goal' && <Tag color="gray" text="Goal reached!" />}
          {(Status === 'Deceased' || Status === 'Completed') && (
            <Tag color="gray" text="Campaign closed" />
          )}
          {Region && <Feature label="Location" value={Region} />}
          <h4 className="text-primary-800 uppercase text-xxs tracking-wide font-medium pb-px my-2">
            Description
          </h4>
          <div
            className="airtable-markdown text-sm lg:text-base leading-normal text-primary-900"
            dangerouslySetInnerHTML={{
              __html: Description.childMarkdownRemark.html,
            }}
          />
          <div className="my-4 flex flex-wrap">
            <OutboundLink
              className="bg-urgent-600 my-4 block w-full md:w-max text-center shadow-sm
              rounded-md text-white text-xl px-8 py-2 mb-2 md:mb-0 hover:bg-urgent-400"
              href="https://artformutualaid.gumroad.com/"
              target="_blank"
            >
              Donate for the MAI Zine
            </OutboundLink>
          </div>
        </div>
      </div>
    </div>
  )
}

const Zine = ({ data }) => {
  const nodes = data.items.nodes

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
            href="https://artformutualaid.gumroad.com/"
          >
            Donate for the MAI&nbsp;Zine
          </OutboundLink>
        </div>
      </div>

      <div className="lg:container px-2 sm:px-4 md:px-7 py-6">
        {nodes.map((node, i) => (
          <CustomEntry {...node.data} />
        ))}
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
