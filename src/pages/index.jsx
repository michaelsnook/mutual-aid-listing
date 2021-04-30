import React from "react"
import { graphql, withPrefix } from "gatsby"
import { Cards, Hero, SiteMetadata } from "../components"
import { Layout } from "../layouts/Layout"
import Helmet from "react-helmet"
import { MenuIcon, XIcon } from '@heroicons/react/outline'

export default ({ data }) => {
  var filter_foreign = (typeof window !== 'undefined' 
    && window.location.search.indexOf('foriegn_fund=true') !== -1)

  var category_cards = {}
  var categories = {}
  data.items.nodes.forEach((item) => {
    if (
      typeof window === "undefined" ||
      (window.location.search !== "" &&
        item["data"]["Foreign_Funds"] === true) ||
      window.location.search === ""
    ) {
      categories[item["data"]["Category_Rank"]] = item["data"]["Category"]

      if (category_cards[item["data"]["Category"]]) {
        category_cards[item["data"]["Category"]].push(item)
      } else {
        category_cards[item["data"]["Category"]] = []
        category_cards[item["data"]["Category"]].push(item)
      }
    }
  })
  return (
    <Layout>
      <SiteMetadata
        title="Mutual Aid India"
        description="A curated list of opportunities to donate for COVID relief."
        image={data.hero.url}
      />

      <Hero
        image={data.hero}
        tag="#urgent"
        title="Mutual Aid India"
        description="A curated list of opportunities to donate for COVID relief."
      />

      <nav className="shadow-lg z-40 p-5 sticky top-0 bg-white w-full">
        <div className="flex flex-row justify-between w-full">
          <button id="hamburger" className="focus:outline-none focus:ring focus:border-blue-300 rounded-sm">
            <MenuIcon className="block h-6 w-6 toggle block" aria-hidden="true" />
            <XIcon className="block h-6 w-6 toggle hidden" aria-hidden="true" />
          </button>
          <a
            href={filter_foreign ? `/` : `/?foriegn_fund=true`}
            className="bg-pink-600 shadow-sm rounded-md text-white px-4 py-2"
          >
            {filter_foreign ? `View all funds` : `Donate in £ $ €`}
          </a>
        </div>
        <div className="flex flex-col toggle w-full text-center hidden">

          {Object.keys(categories).map((category_header) => (
            <a
              href={"#category_" + category_header}
              className="block md:inline-block text-blue-900 px-3 py-3 mx-auto
                hover:bg-blue-300 rounded-md"
            >
              {categories[category_header]}
            </a>
          ))}
        </div>

      </nav>

      <Helmet>
        <script src={withPrefix("nav_links.js")} type="text/javascript" />
      </Helmet>

      <div className="container pt-6">
        <div className="flex flex-wrap bg-yellow-200 border border-yellow-600 rounded-md py-5 px-8 max-w-3xl mx-auto">
          <p className="mt-2 mb-1 font-bold">Info for donors/supporters:</p>
          <p className="mb-2">
            <ul className="list-disc pl-5">
              <li>
                Please filter for urgent needs first, marked in red as "URGENT"
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
            Disclaimer: this list is curated by an informal group of volunteers.
            Nothing on this site should be taken as a warantee or legal advice.
            Give at your own discretion, but please do give generously.
          </p>
        </div>
      </div>

      {Object.keys(categories).map((category_header, index) => (
        <div
          className="container overflow-hidden pt-6"
          id={"category_" + category_header}
        >
          <h4 className="text-blue-800 uppercase text-sm tracking-wide font-medium pb-px">
            Category
          </h4>
          <h2
            className="text-2xl lg:text-4xl font-bold leading-tight text-black"
            key={index}
          >
            {categories[category_header]}
          </h2>

          <Cards nodes={category_cards[categories[category_header]]} />
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
          Summary
          Urgent
          Foreign_Funds
          Category
          Category_Rank
        }
      }
    }
  }
`
