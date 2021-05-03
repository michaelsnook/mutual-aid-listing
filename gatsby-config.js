require("dotenv").config()

module.exports = {
  siteMetadata: {
    links: {
      contact: "mailto:covidmutualaidindia@protonmail.com",
      facebook: "https://www.facebook.com",
      linkedin: "https://www.linkedin.com",
      twitter: "https://www.twitter.com",
    },
    locale: "en",
    title: "Mutual Aid India",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [require("tailwindcss"), require("autoprefixer")],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          // Google Analytics / GA / Google Ads / Adwords / AW / Marketing Platform 
          // advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
          "G-MK3YMNPNW0",
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        /* gtagConfig: {
          // optimize_id: "OPT_CONTAINER_ID",
          // anonymize_ip: true,
          cookie_expires: 0,
        }, */
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          head: false,
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: ["mutual-aid-listing.pages.dev/*"],
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-modal-routing`,
      options: {
        // See http://reactcommunity.org/react-modal/#usage
        modalProps: {
          style: {
            overlay: {
              backgroundColor: `rgba(0, 0, 0, 0.5)`,
            },
            content: {
              position: `absolute`,
              border: `none`,
              background: `none`,
              padding: 0,
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              overflow: `auto`,
              WebkitOverflowScrolling: `touch`,
            },
          },
        },
      },
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        tables: [
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: process.env.AIRTABLE_TABLE_NAME,
            tableView: process.env.AIRTABLE_VIEW_NAME,
            mapping: { Image: "fileNode" },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Mutual Aid India`,
        short_name: `Mutual Aid India`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#16A34A`,
        display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
  ],
}
