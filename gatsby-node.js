require('dotenv').config()
const path = require(`path`)
const { AIRTABLE_TABLE_NAME: tableName } = process.env

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allAirtable(
          filter: {
            table: { eq: "${tableName}" }
            data: { Publish: { in: ["Yes", "Completed"] } }
          }
        ) {
          nodes {
            data {
              Slug
            }
          }
        }
      }
    `).then(({ errors, data }) => {
      if (errors) {
        reject(errors)
      }

      const component = path.resolve(`./src/templates/single-item.jsx`)

      console.log('=====')
      console.log(`${data.allAirtable.nodes.length} nodes`)
      console.log('=====')

      data.allAirtable.nodes.map(({ data: { Slug } }) => {
        createPage({
          component,
          context: { Slug },
          path: `/${Slug}`,
        })
      })

      resolve()
    })
  })
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions

  createPage({
    ...page,
    context: {
      ...page.context,
      tableName,
    },
  })
}
