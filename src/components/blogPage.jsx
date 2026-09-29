import React from 'react';
import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import JsonLd from './JsonLd';
import { itemListJsonLd, webPageJsonLd } from '../utils/seo';
import OptimizedImage from './OptimizedImage';

const pageDescription = 'Read Snackster blogs for party snack ideas, frozen chicken snack inspiration, hosting tips, quick starters, and ready to cook snack recommendations.';
const pageText = 'The Snackster blog is a place for party snack ideas, quick hosting inspiration, and practical ways to make ready to cook chicken snacks work harder for every occasion. Whether you are planning a house party, stocking the freezer for the week, or building a snack spread for friends, these articles help you choose products, pair flavors, and serve snacks with less effort. Explore tips around frozen snacks, easy starters, party platters, chicken snack recipes, and online snack ordering. Each blog is written to help you move from "what should we serve?" to a snack plan that is quick, fun, and crowd-friendly. Start with the latest article below and use it as a guide for your next party menu.';

const GET_BLOGS = gql`
  query {
   blogPostsCollection {
      items {
        title
        blogUrl
        featuredImage {
          url
          title
        }
      }
    }
  }
`;

const BlogsPage = () => {
  const { loading, error, data } = useQuery(GET_BLOGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const blogs = data.blogPostsCollection.items.map((blog, index) => ({
    id: index,
    title: blog.title,
    image: blog.featuredImage.url,
    url: `blogs/${blog.blogUrl}`,
  }));

  return (
    <>
      <Helmet>
        <title>Party Snacks Blog | Frozen Snacks, Hosting Ideas - Snackster</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href="https://www.snackster.co.in/blogs" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Party Snacks Blog | Frozen Snacks, Hosting Ideas - Snackster" />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content="https://www.snackster.co.in/blogs" />
        <meta property="og:image" content="https://www.snackster.co.in/images/snackster_logo.svg" />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="1080" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Party Snacks Blog | Frozen Snacks, Hosting Ideas - Snackster" />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://www.snackster.co.in/images/snackster_logo.svg" />
        
        <meta name="twitter:site" content="@SnehaSnackster" />
        
        
        
        
        
      </Helmet>
      <JsonLd data={webPageJsonLd({
        name: 'Party Snacks Blog',
        url: '/blogs',
        description: pageDescription,
        text: pageText,
      })} />
      <JsonLd data={itemListJsonLd({ name: 'Snackster Blogs', url: '/blogs', items: blogs })} />
      <div className="party-more-fun-container py-5">
        <h1 className="party-title pt-5 text-center">Party Snacks Blog</h1>
        <div className="container mt-5 mb-4">
          <div className="row">
            {blogs.map((blog) => (
              <div key={blog.id} className="col-md-3">
                <Link to={`/${blog.url}`}>
                <div className='blog-card'>
                    <OptimizedImage src={blog.image} alt={blog.title} responsive={true} loading="lazy" />
                </div>
                    <h2 className="text-center blog-title">{blog.title}</h2>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogsPage;
