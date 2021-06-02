import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { Entry, Hero, SiteMetadata } from '../components'
import { Layout } from '../layouts/Layout'
import { Nav } from '../components'

const Mixtape = ({ data }) => {
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

      <Hero
        image={data.hero}
        tag="fundraisers"
        title="Mutual Aid Mixtape"
        description="Check the fundraisers below to support the MAI Mixtape"
      />

      <div className="lg:container grid grid-cols-4">
        <div className="col-span-4 lg:col-span-1 lg:py-10 py-4">
          <Nav isToggled={isForeignDonor} setToggled={setIsForeignDonor} />
        </div>

        <div className="lg:col-start-2 col-span-4 px-1 sm:px-3 md:px-5 lg:px-8 ml-0">
          {nodes.map((node, i) => (
            <div
              className="mb-10 py-8 md:py-10 lg:py-12 px-4 md:px-8 lg:px-10 bg-white shadow-md rounded-md"
              id={`track_${i}`}
            >
              <h4 className="text-primary-800 uppercase text-sm tracking-wide font-medium pb-px">
                {node.data.Category}
              </h4>
              <div className="flex flex-wrap -mx-3 lg:-mx-4 xl:-mx-6">
                <div
                  className="w-full px-3 xl:px-6 lg:px-4 py-6"
                  key={`card_${node.data.Slug}`}
                >
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query MixtapeQuery($tableName: String!) {
    hero: file(relativePath: { eq: "hero-banner.jpg" }) {
      ...HeroImageFragment
    }
    items: allAirtable(
      filter: { table: { eq: $tableName }, data: { Mixtape: { eq: true } } }
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
export default Mixtape
