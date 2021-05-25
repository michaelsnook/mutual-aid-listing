import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { Entries, Hero, SiteMetadata } from '../components'
import { Layout } from '../layouts/Layout'
import { Nav } from '../components'
import { Link } from 'gatsby-plugin-modal-routing-3'
import { OutboundLink } from 'gatsby-plugin-google-gtag'

const Index = ({ data }) => {
  const [isAlertClosed, setIsAlertClosed] = useState(false)
  const [isForeignDonor, setIsForeignDonor] = useState(false)

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
      />

      <Hero
        tag="fundraisers"
        title="Mutual Aid India"
        description="A curated list of opportunities to donate for COVID relief."
      />

      {!isAlertClosed && (
        <div className="md:container pt-2 mb-2 md:pt-4 md:mb-4 lg:pt-6 lg:mb-6">
          <div className="mx-3 md:mx-0 relative bg-yellow-100 shadow-md rounded-md py-5 px-8">
            <button
              className="absolute top-0 right-0 p-3"
              onClick={() => {
                setIsAlertClosed(true)
              }}
              area-pressed="false"
            >
              ✕
            </button>
            <h1 className="mt-2 mb-1 font-bold">Info for donors/supporters:</h1>
            <p className="mb-2">
              <ul className="list-disc pl-5">
                <li>
                  We vet and track everything we add to the website –{' '}
                  <OutboundLink
                    className="text-primary-700 font-bold hover:text-primary-500"
                    href="https://docs.google.com/document/d/1HzDK589lbyUtS-sDyUF9U2T-zkkT6CyCa3RY7WYBk3E/edit"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    click here to read about our internal process for vetting
                    and listing fundraisers, our commitment to equity, and our
                    team in the document here.
                  </OutboundLink>
                </li>
                <li>
                  Please look for the most urgent needs first, marked in red as
                  "Urgent".
                </li>
                <li>
                  If you are donating from abroad, please look for fundraisers
                  accepting foreign donations, marked with "£&nbsp;$&nbsp;€".
                </li>
                <li>
                  If you are an NRI donating from an Indian bank account, your
                  donations don't count as "foreign" and you don't have to worry
                  about this.
                </li>
                <li>
                  If you have a campaign you want us to add, email{' '}
                  <span className="italic">
                    covidmutualaidindia
                    <wbr />
                    @protonmail.com
                  </span>
                  .
                </li>
              </ul>
            </p>
            <p className="italic text-gray-600 my-2">
              Disclaimer: this list is curated by an informal group of
              volunteers. Nothing on this site should be taken as a warantee or
              legal advice. Give at your own discretion, but please do give
              generously.
            </p>
          </div>
        </div>
      )}

      <div className="lg:container grid grid-cols-4">
        <div className="col-span-4 lg:col-span-1 lg:py-10 py-4">
          <Nav
            categories={categories}
            isToggled={isForeignDonor}
            setToggled={setIsForeignDonor}
          />
        </div>

        <div className="lg:col-start-2 col-span-4 px-1 sm:px-3 md:px-5 lg:px-8 ml-0">
          <div className="py-3 lg:py-6">
            <h1 className="text-2xl font-bold leading-tight text-black my-3">
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
    items: allAirtable(filter: { table: { eq: $tableName } }) {
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
