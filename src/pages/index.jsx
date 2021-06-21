import React, { useState } from 'react'
import { graphql } from 'gatsby'
import {
  Entries,
  Hero,
  SiteMetadata,
  PromoMixtape,
  PromoZine,
  DismissableAlert,
} from '../components'
import { Layout } from '../layouts/Layout'
import { Nav } from '../components'
import { Link } from 'gatsby-plugin-modal-routing-3'

const Index = ({ data }) => {
  const [isForeignDonor, setIsForeignDonor] = useState(false)
  const show_mixtape = data.options.siteMetadata.show_mixtape
  const show_zine = data.options.siteMetadata.show_zine
  let urgent_cards = {}
  let regular_cards = {}
  let goal_met_cards = {}
  let categories = {}
  let highlighted_campaigns = []

  data.items.nodes.forEach((item) => {
    if (item['data']['Foreign_Funds'] === true || isForeignDonor === false) {
      const { Category, Category_Rank } = item.data
      categories[Category_Rank] = Category
      urgent_cards[Category] = urgent_cards[Category] || []
      regular_cards[Category] = regular_cards[Category] || []
      goal_met_cards[Category] = goal_met_cards[Category] || []

      if (item['data']['Urgent'] === true) {
        highlighted_campaigns.push(item)
        urgent_cards[Category].push(item)
      } else if (item['data']['Status'] === 'Met Goal and Increased') {
        goal_met_cards[Category].push(item)
      } else {
        regular_cards[Category].push(item)
      }
    }
  })

  highlighted_campaigns.sort(() => Math.random() - 0.5)
  if (highlighted_campaigns.length > 6) highlighted_campaigns.length = 6

  return (
    <Layout>
      <SiteMetadata
        title="MutualAidIndia.com | Home"
        description="A curated list of opportunities to donate for COVID relief."
        image={data.hero.url}
      />
      <hr className="my-8 invisible lg:hidden" />
      <Hero
        image={data.hero}
        tag="fundraisers"
        title="Mutual Aid India"
        description="A curated list of opportunities to donate for COVID relief."
      />

      {show_zine && <PromoZine />}
      {show_mixtape && <PromoMixtape />}

      <DismissableAlert />

      <div className="lg:container grid grid-cols-4">
        <div className="col-span-4 lg:col-span-1 lg:pb-8 py-4">
          <Nav
            categories={categories}
            isToggled={isForeignDonor}
            setToggled={setIsForeignDonor}
          />
        </div>

        <div className="lg:col-start-2 col-span-4 px-1 sm:px-3 md:px-7 lg:px-8 ml-0">
          <div className="py-6">
            <h1 className="text-2xl font-bold leading-tight text-black my-3 px-4">
              Highlighted Campaigns
            </h1>
            <div className="grid md:grid-cols-2 gap-4 ">
              {highlighted_campaigns.map((highlighted_campaign, index) => (
                <Link
                  to={`/${highlighted_campaign['data']['Slug']}`}
                  className="hover:bg-primary-600 hover:text-white bg-white relative rounded-md
                      shadow-md px-5 py-4 cursor-pointer flex focus:outline-none"
                  state={{
                    current: index,
                    items: highlighted_campaigns.map(
                      (highlighted_campaign) =>
                        `/${highlighted_campaign.data.Slug}`
                    ),
                  }}
                  asModal
                >
                  <div class="flex items-center justify-between w-full">
                    <div class="flex items-center">
                      <div class="text-md">
                        <p class="font-medium">
                          {highlighted_campaign['data']['Name']}
                        </p>
                        <span class="inline">
                          {highlighted_campaign['data']['Region']}
                        </span>
                      </div>
                    </div>
                    <div class="flex-shrink-0"></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {Object.keys(categories).map((category_header, index) => (
            <div
              className="mb-10 py-8 md:py-10 lg:py-12 px-4 md:px-8 lg:px-10 bg-white shadow-md rounded-md"
              id={`category_${category_header}`}
            >
              <h4 className="text-primary-800 uppercase text-sm tracking-wide font-medium pb-px">
                Category
              </h4>
              <h2
                className="text-2xl lg:text-4xl font-bold leading-tight text-black"
                key={index}
              >
                {categories[category_header]}
              </h2>

              <Entries
                nodes={urgent_cards[categories[category_header]].concat(
                  regular_cards[categories[category_header]],
                  goal_met_cards[categories[category_header]]
                )}
                isForeignDonor={isForeignDonor}
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query IndexQuery($tableName: String!) {
    hero: file(relativePath: { eq: "hero-banner.jpg" }) {
      ...HeroImageFragment
    }
    options: site {
      siteMetadata {
        show_mixtape
        show_zine
      }
    }
    items: allAirtable(
      filter: { data: { Publish: { eq: "Yes" } }, table: { eq: $tableName } }
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
export default Index
