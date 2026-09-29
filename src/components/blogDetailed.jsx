import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Helmet } from 'react-helmet-async';
import JsonLd from './JsonLd';
import { blogPostingJsonLd, breadcrumbJsonLd, withBrandTitle } from '../utils/seo';
import NotFound from './NotFound';
import OptimizedImage from './OptimizedImage';


const GET_BLOG_DETAIL = gql`
  query GetBlogDetail($blogUrl: String!) {
   blogPostsCollection(where: { blogUrl: $blogUrl }) {
      items {
        title
        metaTitle
        metaDescription
        featuredImage {
          url
          title
        }
        blogContent
      }
    }
}
`;

const BlogDetail = () => {
  const { blogUrl } = useParams();
  const { loading, error, data } = useQuery(GET_BLOG_DETAIL, {
    variables: { blogUrl },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const blog = data.blogPostsCollection.items[0];
  if (!blog) return <NotFound />;

  const { title, featuredImage, blogContent } = blog;
  const pageTitle = withBrandTitle(blog.metaTitle);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={blog.metaDescription} />
        <link rel="canonical" href={`https://www.snackster.co.in/blogs/${blogUrl}`} />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={blog.metaDescription} />
        <meta property="og:url" content={`https://www.snackster.co.in/blogs/${blogUrl}`} />
        <meta property="og:image" content={featuredImage.url} />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="1080" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={blog.metaDescription} />
        <meta name="twitter:image" content={featuredImage.url} />
        <meta name="twitter:site" content="@SnehaSnackster" />
      </Helmet>
      <JsonLd data={blogPostingJsonLd({ blog, slug: blogUrl })} />
      <JsonLd data={breadcrumbJsonLd([
        { name: 'Home', url: '/' },
        { name: 'Blogs', url: '/blogs' },
        { name: title, url: `/blogs/${blogUrl}` },
      ])} />
      <div>
        <div className='bg-pink py-5'>
          <div className="container pt-3 mt-5">
            <h1 className='text-uppercase text-center blog-heading'>{title}</h1>
            <center><OptimizedImage src={featuredImage.url} alt={featuredImage.title} className="w-75" loading="lazy" responsive={true} /></center>
            <div className='blog-content'><ReactMarkdown>{blogContent}</ReactMarkdown></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
