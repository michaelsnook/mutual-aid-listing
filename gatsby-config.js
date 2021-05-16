require('dotenv').config()

module.exports = {
  siteMetadata: {
    links: {
      email:
        "mailto:?subject=Donating%20to%20COVID%20Mutual%20Aid%20in%20India&body=Hello%20friends%20and%20family%2C%0d%0a%0d%0aI%20wanted%20to%20take%20a%20moment%20to%20share%20this%20link%20with%20you%3A%20https%3A%2F%2Fmutualaidindia.com.%0d%0a%0d%0aThis%20is%20a%20list%20of%20mutual%20aid%20fundraisers%20for%20COVID%20relief%20in%20India%2C%20curated%20by%20a%20team%20of%20volunteers%20and%20updated%20round%20the%20clock.%20Mutual%20Aid%20means%20giving%20directly%20to%20people%20in%20need%20--%20paying%20hospital%20bills%2C%20buying%20rations%20for%20families%2C%20or%20funding%20volunteers%20who%20are%20making%20meals%20and%20handing%20out%20PPE%20where%20they're%20needed%20most.%0d%0a%0d%0aI%20hope%20you'll%20have%20a%20look%20and%20find%20a%20fundraiser%20that%20speaks%20to%20you%20--%20or%20find%20two%20or%20three!%20India's%20COVID%20crisis%20right%20now%20is%20unlike%20anything%20we've%20ever%20seen%2C%20and%20the%20needs%20are%20great.%20If%20you%20can%20give%2C%20please%20give%20generously.%0d%0a%0d%0aSincerely%2C%0d%0a%0d%0a",
      instagram: 'https://www.instagram.com/mutualaidindia/',
      facebook:
        'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmutualaidindia.com',
      twitter:
        'https://www.twitter.com/intent/tweet/?url=https%3A%2F%2Fmutualaidindia.com&text=I%20just%20donated%20to%20one%20of%20the%20%23MutualAid%20fundraisers%20for%20%23COVIDrelief.%20Check%20out%20the%20list%20and%20give%20what%20you%20can',
    },
    locale: 'en',
    title: 'Mutual Aid India',
  },
  plugins: [
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [require('tailwindcss'), require('autoprefixer')],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          // Google Analytics / GA / Google Ads / Adwords / AW / Marketing Platform
          // advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
          'G-MK3YMNPNW0',
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
          exclude: ['mutual-aid-listing.pages.dev/*'],
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-modal-routing-3`,
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
            mapping: { Image: 'fileNode' },
            defaultValues: {
              Region: '',
              Name: 'Unnamed',
              Urgent: false,
              Foreign_Funds: false,
              Category: 'Uncategorized',
              Category_Rank: 100,
              Description: '',
              Bank_Details: '',
              Rupees_Goal: 0,
              Rupees_Reached: 0,
            },
            mapping: {
              Description: 'text/markdown',
              Image: 'fileNode',
            },
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
