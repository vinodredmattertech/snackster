require('dotenv').config();
const { ApolloClient, InMemoryCache, HttpLink, gql } = require('@apollo/client');
const fetch = require('cross-fetch'); // Required for Apollo Client in Node.js
const fs = require('fs');
const path = require('path');

// Set up the Apollo Client
const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URI, // Replace with your GraphQL endpoint
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}` // Replace with your auth token
    },
    fetch,
  }),
  cache: new InMemoryCache(),
});

async function fetchContentfulData(query, variables = {}) {
  try {
    const { data } = await client.query({
      query: gql(query),
      variables,
    });
    return data;
  } catch (error) {
    console.error('Error fetching data from Contentful:', error);
    return null;
  }
}

function generateSitemapXml(urls) {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  urls.forEach((changefreq, loc) => {
    sitemap += `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n  </url>\n`;
  });

  sitemap += `</urlset>`;
  return sitemap;
}

function generateSitemapIndex(sitemaps) {
  let index = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  index += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  sitemaps.forEach((sitemapUrl) => {
    index += `  <sitemap>\n    <loc>${sitemapUrl}</loc>\n  </sitemap>\n`;
  });

  index += `</sitemapindex>`;
  return index;
}

async function generateSitemap() {
  const baseUrl = 'https://www.snackster.co.in';
  
  // Define static pages
  const staticPages = [
    '/',
    '/about',
    '/products',
    '/recipes',
    '/blogs',
  ];

  // Define GraphQL queries
  const productQuery = `
    query {
      productsCollection {
        items {
          productUrl
        }
      }
    }
  `;

  const recipeQuery = `
    query {
      recipeCollection {
        items {
          recipeUrl
        }
      }
    }
  `;

  const blogQuery = `
  query {
    blogPostsCollection {
      items {
        blogUrl
      }
    }
  }
`;

  const collectionQuery = `
    query {
      productsCollection(where: { productCollection: { collectionUrl_exists: true } }) {
        items {
          productCollection {
            collectionUrl
          }
        }
      }
    }
  `;

  // Fetch data
  const productData = await fetchContentfulData(productQuery);
  const recipeData = await fetchContentfulData(recipeQuery);
  const blogData = await fetchContentfulData(blogQuery);
  const collectionData = await fetchContentfulData(collectionQuery);

  // Separate URLs by type
  const mainUrls = new Map();
  const productUrls = new Map();
  const recipeUrls = new Map();
  const blogUrls = new Map();

  const addMainUrl = (pathName, changefreq = 'weekly') => {
    const loc = pathName === '/' ? baseUrl : `${baseUrl}${pathName}`;
    mainUrls.set(loc, changefreq);
  };

  const addProductUrl = (pathName, changefreq = 'weekly') => {
    productUrls.set(`${baseUrl}${pathName}`, changefreq);
  };

  const addRecipeUrl = (pathName, changefreq = 'weekly') => {
    recipeUrls.set(`${baseUrl}${pathName}`, changefreq);
  };

  const addBlogUrl = (pathName, changefreq = 'weekly') => {
    blogUrls.set(`${baseUrl}${pathName}`, changefreq);
  };

  // Add static pages to main sitemap
  staticPages.forEach((page) => {
    addMainUrl(page, 'daily');
  });

  // Add product URLs to products sitemap
  if (productData && productData.productsCollection) {
    productData.productsCollection.items.forEach((product) => {
      addProductUrl(`/products/${product.productUrl}`, 'weekly');
    });
  }

  // Add collection URLs to main sitemap
  if (collectionData && collectionData.productsCollection) {
    const uniqueCollections = new Set();
    collectionData.productsCollection.items.forEach((collection) => {
      if (collection.productCollection && collection.productCollection.collectionUrl) {
        uniqueCollections.add(collection.productCollection.collectionUrl);
      }
    });
    uniqueCollections.forEach((collectionUrl) => {
      addMainUrl(`/collections/${collectionUrl}`, 'weekly');
    });
  }

  // Add recipe URLs to recipes sitemap
  if (recipeData && recipeData.recipeCollection) {
    recipeData.recipeCollection.items.forEach((recipe) => {
      addRecipeUrl(`/recipes/${recipe.recipeUrl}`, 'weekly');
    });
  }

  // Add blog URLs to blogs sitemap
  if (blogData && blogData.blogPostsCollection) {
    blogData.blogPostsCollection.items.forEach((blog) => {
      addBlogUrl(`/blogs/${blog.blogUrl}`, 'weekly');
    });
  }

  // Generate individual sitemaps
  const mainSitemap = generateSitemapXml(mainUrls);
  const productSitemap = generateSitemapXml(productUrls);
  const recipeSitemap = generateSitemapXml(recipeUrls);
  const blogSitemap = generateSitemapXml(blogUrls);

  // Write sitemaps to files
  const publicDir = path.join(__dirname, 'public');
  
  fs.writeFileSync(path.join(publicDir, 'pages.sitemap.xml'), mainSitemap);
  console.log('✓ Pages sitemap (pages.sitemap.xml) generated successfully!');

  fs.writeFileSync(path.join(publicDir, 'products.sitemap.xml'), productSitemap);
  console.log('✓ Products sitemap (products.sitemap.xml) generated successfully!');

  fs.writeFileSync(path.join(publicDir, 'recipes.sitemap.xml'), recipeSitemap);
  console.log('✓ Recipes sitemap (recipes.sitemap.xml) generated successfully!');

  fs.writeFileSync(path.join(publicDir, 'blogs.sitemap.xml'), blogSitemap);
  console.log('✓ Blogs sitemap (blogs.sitemap.xml) generated successfully!');

  // Generate sitemap index
  const sitemapIndex = generateSitemapIndex([
    `${baseUrl}/pages.sitemap.xml`,
    `${baseUrl}/products.sitemap.xml`,
    `${baseUrl}/recipes.sitemap.xml`,
    `${baseUrl}/blogs.sitemap.xml`,
  ]);

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapIndex);
  console.log('✓ Sitemap index (sitemap.xml) generated successfully!');
  console.log('\n✅ All sitemaps generated successfully!');
}

// Run the function to generate the sitemap
generateSitemap();
