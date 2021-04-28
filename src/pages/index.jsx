import React from "react"
import { graphql } from "gatsby"
import { Cards, Hero, SiteMetadata } from "../components"
import { Layout } from "../layouts/Layout"

export default ({ data }) => {
  var category_cards = {}
  data.items.nodes.map(function (item, i) {
    if (category_cards[item["data"]["category"]]) {
      category_cards[item["data"]["category"]].push(item)
    } else {
      category_cards[item["data"]["category"]] = []
      category_cards[item["data"]["category"]].push(item)
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

      {Object.keys(category_cards).map((category_header, index) => (
        <div>
          <h2
            className="container text-2xl lg:text-4xl font-bold leading-tight text-black pt-6"
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
