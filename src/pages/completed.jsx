import React from 'react'
import { graphql } from 'gatsby'
import { Entries, Hero, SiteMetadata } from '../components'
import { Layout } from '../layouts/Layout'
import { Nav } from '../components'

const Completed = ({ data }) => {
  let regular_cards = {}
  let deceased_cards = {}
  let categories = {}

  data.items.nodes.forEach((item) => {
    const { Category, Category_Rank } = item.data
    categories[Category_Rank] = Category
    regular_cards[Category] = regular_cards[Category] || []
    deceased_cards[Category] = deceased_cards[Category] || []

    if (item['data']['Status'] === 'Deceased') {
      deceased_cards[Category].push(item)
    } else {
      regular_cards[Category].push(item)
    }
  })

  return (
    <Layout>
      <SiteMetadata
        title="MutualAidIndia.com | Completed Campaigns"
        description="A list of fundraisers that have reached their goal or ended for another reason."
        image={data.hero.url}
      />
      <hr className="my-8 invisible lg:hidden" />
      <Hero
        image={data.hero}
        tag="completed"
        title="Mutual Aid India – Completed Campaigns"
        description="A list of fundraisers that have reached their goal or ended for another reason."
      />

      <div className="lg:container grid grid-cols-4">
        <div className="col-span-4 lg:col-span-1 lg:py-10 py-4">
          <Nav categories={categories} />
        </div>

        <div className="lg:col-start-2 col-span-4 px-1 sm:px-3 md:px-5 lg:px-8 ml-0">
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
                nodes={[
                  ...regular_cards[categories[category_header]],
                  ...deceased_cards[categories[category_header]],
                ]}
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query CompletedQuery($tableName: String!) {
    hero: file(relativePath: { eq: "hero-banner.jpg" }) {
      ...HeroImageFragment
    }
    items: allAirtable(
      filter: {
        data: { Publish: { eq: "Completed" } }
        table: { eq: $tableName }
      }
    ) {
      nodes {
        data {
          Region
          Name
          Slug
          Rupees_Reached
          Status
          Category
          Category_Rank
          Description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
export default Completed
