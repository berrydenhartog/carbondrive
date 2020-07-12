const SitemapPlugin = require('sitemap-webpack-plugin').default;
const paths = [
    {
        path: '/',
        lastmod: new Date().toISOString().slice(0,10),
        priority: '0.8',
        changefreq: 'hourly'
    },
    {
      path: '/dienstverlening',
      lastmod: new Date().toISOString().slice(0,10),
      priority: '0.8',
      changefreq: 'hourly'
    },
    {
      path: '/modules',
      lastmod: new Date().toISOString().slice(0,10),
      priority: '0.8',
      changefreq: 'hourly'
    },
    {
      path: '/website',
      lastmod: new Date().toISOString().slice(0,10),
      priority: '0.8',
      changefreq: 'hourly'
    },
    {
      path: '/webshop',
      lastmod: new Date().toISOString().slice(0,10),
      priority: '0.8',
      changefreq: 'hourly'
    },
    {
      path: '/contact',
      lastmod: new Date().toISOString().slice(0,10),
      priority: '0.8',
      changefreq: 'hourly'
    },
    {
      path: '/faq',
      lastmod: new Date().toISOString().slice(0,10),
      priority: '0.8',
      changefreq: 'hourly'
    },
    {
      path: '/kosten',
      lastmod: new Date().toISOString().slice(0,10),
      priority: '0.8',
      changefreq: 'hourly'
    },
];


module.exports = {
  configureWebpack: {
    //optimization: {
    //  splitChunks: false
    //},
    plugins: [
      new SitemapPlugin('https://sugarfly.nl', paths, {
          filename: 'sitemap.xml',
          lastmod: true,
          changefreq: 'hourly',
          priority: '0.8'
      })
    ]
  },
}