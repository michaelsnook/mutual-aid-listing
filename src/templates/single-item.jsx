import { graphql } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import { Feature, SiteMetadata } from "../components"
import { useModal } from "../context"
import { Layout } from "../layouts/Layout"

export default (props) => {
  const { data, location } = props
  const {
    region,
    description,
    image: {
      localFiles: [cover],
    },
    name,
    summary,
    tags,
    url,
    urgent,
    foreignFunds,
  } = data.item.data
  const navigation = location.state ? location.state.navigation : null
  const { modal } = useModal()

  return (
    <Layout navigation={navigation}>
      <SiteMetadata title={name} description={summary} image={cover.url} />
      <article className={modal && "max-h-80vh md:max-h-90vh overflow-auto"}>
        <div className={modal ? "p-4 lg:p-8" : "container py-8"}>
          <h1 className="text-2xl lg:text-3xl text-blue-500 dark:text-blue-400 font-bold leading-tight">
            {name}
          </h1>
          <p className="text-base lg:text-lg text-blue-800 dark:text-blue-500 font-medium mb-4">
            {summary}
          </p>
          <div className="flex flex-wrap">
            <div className="w-full pb-4 lg:w-3/5 lg:pr-4 lg:pb-0">
              <Img fluid={cover.childImageSharp.fluid} alt={name} />
            </div>
            <div className="w-full lg:w-2/5 lg:pl-4">
            { urgent && (
              <p className="mb-2">
                <span className="bg-pink-600 shadow-sm rounded-md text-white px-3 py-1 mr-2">Urgent</span>
              </p>
            )}
            { foreignFunds && (
              <p className="mb-2">
                <span className="bg-blue-900 shadow-sm rounded-md text-white px-3 py-1 mr-2">£ $ €</span>
                <span className="text-blue-900 dark:text-blue-600">This campaign is able to accept foreign contributions.</span>

              </p>
            )}
              <Feature label="Location" value={region} />
              <Feature label="What to see?" value={tags} />
              <Feature label="More info" value={url} />
              <p className="mt-4 whitespace-pre-line text-sm lg:text-base leading-normal text-blue-900 dark:text-blue-600">
                {description}
              </p>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query SingleItemQuery($slug: String!) {
    item: airtable(data: { slug: { eq: $slug } }) {
      data {
        region
        description
        name
        image {
          localFiles {
            url: publicURL
            childImageSharp {
              fluid(maxWidth: 733, maxHeight: 480, cropFocus: NORTH) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        slug
        summary
        tags
        url
        urgent
        foreignFunds
      }
    }
  }
`
