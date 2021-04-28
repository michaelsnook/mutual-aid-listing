import React from "react"
import { graphql } from "gatsby"
import { Cards, Hero, SiteMetadata } from "../components"
import { Layout } from "../layouts/Layout"

export default ({ data }) => {
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

      <Cards nodes={data.items.nodes} />
    </Layout>
  )
}

export const query = graphql`
  query IndexQuery($tableName: String!) {
    hero: file(relativePath: { eq: "mutual-aid-love.jpg" }) {
      ...HeroImageFragment
    }
    items: allAirtable(
      filter: {
        table: { eq: $tableName }
        data: { hasBeenVetted: { eq: true } }
      }
    ) {
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
        }
      }
    }
  }
`
