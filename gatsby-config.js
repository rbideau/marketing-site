const camelCase = require('lodash/camelCase');

const theme = require('./src/theme');

const SITE_TITLE = 'Roadie';

module.exports = {
  siteMetadata: {
    title: SITE_TITLE,
    description: 'Hosted, managed, enterprise Backstage',
    siteUrl: 'https://roadie.io',
    demoUrl: 'https://demo.roadie.so',
    social: {
      twitter: 'RoadieHQ',
      github: 'RoadieHQ',
    },
  },

  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
        // Ignore stuff like Vim swp files, .DS_Store etc.
        ignore: ['**/.*'],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
        ignore: ['**/.*'],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/plugins/descriptions`,
        name: `pluginDescriptions`,
        ignore: ['**/template*', '**/.*'],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/plugins/notes`,
        name: `pluginNotes`,
        ignore: ['**/template*', '**/.*'],
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/legal-notices`,
        name: `legal-notices`,
        // Ignore stuff like Vim swp files, .DS_Store etc.
        ignore: ['**/.*'],
      },
    },

    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              // I was having a problem with screenshots which have a white background. Because the
              // background of the blog posts is also white, there was no way to see where the image
              // ended and the blog post began. It all just blurred together. This shadow defins
              // the edge of the image.
              wrapperStyle: 'box-shadow:0 0 5px -2px rgba(0,0,0,0.75);',
              withWebp: true,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-external-links`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },

    {
      resolve: 'gatsby-transformer-plugin-descriptions',
      options: {
        // Without this, the query would just be 'descriptionsYaml'. It's a bit too generic
        // and likely to clash as the site gets more complex.
        typeName: ({ node }) => `${camelCase(node.relativeDirectory)}Yaml`,
      },
    },

    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-166771003-3',
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: SITE_TITLE,
        short_name: SITE_TITLE,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: theme.palette.primary.main,
        display: `minimal-ui`,
        icon: `content/assets/roadie-r-764x764.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-jss',
      options: { theme },
    },
    {
      resolve: 'gatsby-plugin-module-resolver',
      options: {
        root: './src',
        aliases: {
          components: './components',
        },
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        // Excluded pages should also be Disallowed by the robots.txt
        exclude: ['/onboarding'],
      },
    },
    `gatsby-plugin-force-trailing-slashes`,
    'gatsby-plugin-twitter',
  ],
};
