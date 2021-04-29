import React from "react"
import { graphql } from "gatsby"
import { Cards, Hero, SiteMetadata } from "../components"
import { Layout } from "../layouts/Layout"

export default ({ data }) => {
  var category_cards = {}
  data.items.nodes.forEach((item) => {
    if (
      (window.location.search != "" && item["data"]["foreignFunds"] == true) ||
      window.location.search == ""
    ) {
      if (category_cards[item["data"]["category"]]) {
        category_cards[item["data"]["category"]].push(item)
      } else {
        category_cards[item["data"]["category"]] = []
        category_cards[item["data"]["category"]].push(item)
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
                covidmutualaidindia at protonmail dot com
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

      {Object.keys(category_cards).map((category_header, index) => (
        <div className="container overflow-hidden pt-6">
          <h4 class="text-blue-800 uppercase text-sm tracking-wide font-medium pb-px">
            Category
          </h4>
          <h2
            className="text-2xl lg:text-4xl font-bold leading-tight text-black"
            key={index}
          >
            {category_header}
          </h2>

          <Cards nodes={category_cards[category_header]} />
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
          region
          image {
            ...CardImageFragment
          }
          name
          slug
          summary
          urgent
          foreignFunds
          category
        }
      }
    }
  }
`
