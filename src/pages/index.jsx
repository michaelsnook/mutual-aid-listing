import React, { useState } from "react"
import { graphql } from "gatsby"
import { Cards, Hero, SiteMetadata } from "../components"
import { Layout } from "../layouts/Layout"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import { Switch } from "@headlessui/react"
import { Link } from "gatsby-plugin-modal-routing"

export default ({ data }) => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isAlertClosed, setIsAlertClosed] = useState(false)
  const [isForeignDonor, setIsForeignDonor] = useState(false)

  var category_cards = {}
  var categories = {}
  var highlighted_campaigns = []
  data.items.nodes.forEach((item) => {
    if (item["data"]["Foreign_Funds"] === true || isForeignDonor === false) {
      if (item["data"]["Urgent"] === true) {
        highlighted_campaigns.push(item)
      }
      const { Category, Category_Rank } = item.data
      categories[Category_Rank] = Category
      category_cards[Category] = category_cards[Category] || []
      category_cards[Category].push(item)
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

      <Hero
        image={data.hero}
        tag="fundraisers"
        title="Mutual Aid India"
        description="A curated list of opportunities to donate for COVID relief."
      />

      <nav className="shadow-lg z-40 p-5 sticky top-0 bg-white w-full">
        <div className="flex flex-row justify-between w-full">
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="focus:outline-none focus:ring focus:border-primary-300 rounded-sm"
          >
            <MenuIcon
              className={`block h-6 w-6 ${isNavOpen ? "hidden" : "block"}`}
              aria-hidden={isNavOpen ? true : false}
            />
            <XIcon
              className={`block h-6 w-6  ${isNavOpen ? "block" : "hidden"}`}
              aria-hidden={isNavOpen ? false : true}
            />
          </button>

          <div>
            <span className="inline-flex flex-shrink-0 relative h-6 mr-2 align-text-bottom text-primary-900">
              Donate from overseas
            </span>
            <Switch
              checked={isForeignDonor}
              onChange={() => {
                setIsForeignDonor(!isForeignDonor)
              }}
              className={`relative inline-flex items-center flex-shrink-0 ${
                isForeignDonor ? "bg-primary-700" : "bg-gray-600"
              } w-11 h-6 rounded-full cursor-pointer focus:outline-none focus:shadow-outline transition-colors duration-200 ease-in-out`}
            >
              <span
                className={`${
                  isForeignDonor ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transition duration-200 ease-in-out transform bg-white rounded-full`}
              />
            </Switch>
          </div>
        </div>
        <div
          className={`flex-col toggle w-full text-center ${
            isNavOpen ? "flex" : "hidden"
          }`}
        >
          {Object.keys(categories).map((category_header) => (
            <a
              onClick={() => setIsNavOpen(false)}
              href={"#category_" + category_header}
              className="block text-primary-900 px-3 py-3 mx-auto
                hover:bg-primary-200 rounded-md"
            >
              {categories[category_header]}
            </a>
          ))}
          <hr className="my-3" />
          <Link
            to="/about"
            className="block text-primary-900 px-3 py-3 mx-auto hover:bg-primary-200 rounded-md"
          >
            About Us and This List
          </Link>
          <a
            href="https://docs.google.com/document/d/e/2PACX-1vSFpy5vYw2wtESs77spBb1nv3dpGj3Jhv1J3WxMpfURc_MVIgc556s1BqD9z3GO-HVqLQWhWAHxGIOs/pub"
            className="block text-primary-900 px-3 py-3 mx-auto hover:bg-primary-200 rounded-md"
          >
            List of Completed Fundraisers
          </a>
        </div>
      </nav>

      {!isAlertClosed && (
        <div className="container pt-6">
          <div className="relative flex flex-wrap bg-yellow-200 border border-yellow-400 rounded-md py-5 px-8 max-w-3xl mx-auto">
            <button
              className="absolute top-0 right-0 p-3"
              onClick={() => {
                setIsAlertClosed(true)
              }}
              area-pressed="false"
            >
              ✕
            </button>
            <p className="mt-2 mb-1 font-bold">Info for donors/supporters:</p>
            <p className="mb-2">
              <ul className="list-disc pl-5">
                <li>
                  Please filter for urgent needs first, marked in red as
                  "URGENT"
                </li>
                <li>
                  If you are donating from abroad, please look for fundraisers
                  accepting foreign donations, marked with "£ $ €"
                </li>
                <li>
                  If you are an NRI donating from an Indian bank account, your
                  donations don't count as "foreign" and you don't have to worry
                  about this
                </li>
                <li>
                  If you have a campaign you want us to add, email
                  covidmutualaidindia@protonmail.com
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

      <div className="container py-6">
        <h1 className="text-2xl font-bold leading-tight text-black my-3">
          Highlighted Campaigns
        </h1>
        <div className="rounded-md">
          <div className="grid md:grid-cols-2 gap-4 ">
            {highlighted_campaigns.map((highlighted_campaign, index) => (
              <Link
                to={`/${highlighted_campaign["data"]["Slug"]}`}
                className="hover:bg-primary-600 hover:text-white bg-white relative rounded-lg
                    shadow-md px-5 py-4 cursor-pointer flex focus:outline-none"
                state={{
                  current: index,
                  items: highlighted_campaigns.map(
                    (highlighted_campaign) => `/${highlighted_campaign.data.Slug}`
                  ),
                }}
                asModal
              >
              <div class="flex items-center justify-between w-full">
                <div class="flex items-center">
                  <div class="text-md">
                    <p class="font-medium">
                      {highlighted_campaign["data"]["Name"]}
                    </p>
                    <span class="inline">
                      {highlighted_campaign["data"]["Region"]}
                    </span>
                  </div>
                </div>
                <div class="flex-shrink-0">
                </div>
              </div>
            </Link>
            ))}
          </div>
        </div>
      </div>

      {Object.keys(categories).map((category_header, index) => (
        <div
          className="container overflow-hidden -mt-14 pt-20"
          id={"category_" + category_header}
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

          <Cards
            nodes={category_cards[categories[category_header]]}
            isForeignDonor={isForeignDonor}
          />
        </div>
      ))}
    </Layout>
  )
}

export const query = graphql`
  query IndexQuery($tableName: String!) {
    hero: file(relativePath: { eq: "mutual-aid-love.jpg" }) {
      ...HeroImageFragment
    }
    items: allAirtable(filter: { table: { eq: $tableName } }) {
      nodes {
        data {
          Region
          Image {
            ...CardImageFragment
          }
          Name
          Slug
          Rupees_Goal
          Rupees_Reached
          Urgent
          Status
          Foreign_Funds
          Category
          Category_Rank
        }
      }
    }
  }
`
