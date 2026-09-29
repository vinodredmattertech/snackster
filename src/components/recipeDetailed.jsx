import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import PartyMoreFun from '../components/recipeSection';
import { Helmet } from 'react-helmet-async';
import JsonLd from './JsonLd';
import { breadcrumbJsonLd, recipeJsonLd, withBrandTitle } from '../utils/seo';
import NotFound from './NotFound';
import OptimizedImage from './OptimizedImage';


const GET_RECIPE_DETAILS = gql`
  query GetRecipeDetails($recipeSlug: String!) {
    recipeCollection(where: { recipeUrl: $recipeSlug }) {
      items {
        title
        metaTitle
        metaDescription
        featuredImage {
          url
          title
        }
        recipeSteps
      }
    }
  }
`;

const RecipeDetail = () => {
  const { recipeSlug } = useParams();
  const { loading, error, data } = useQuery(GET_RECIPE_DETAILS, {
    variables: { recipeSlug },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const recipe = data.recipeCollection.items[0];
  if (!recipe) return <NotFound />;

  const { title, featuredImage, recipeSteps } = recipe;
  const pageTitle = withBrandTitle(recipe.metaTitle);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={recipe.metaDescription} />
        <link rel="canonical" href={`https://www.snackster.co.in/recipes/${recipeSlug}`} />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={recipe.metaDescription} />
        <meta property="og:url" content={`https://www.snackster.co.in/recipes/${recipeSlug}`} />
        <meta property="og:image" content={featuredImage.url} />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="1080" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={recipe.metaDescription} />
        <meta name="twitter:image" content={featuredImage.url} />
        <meta name="twitter:site" content="@SnehaSnackster" />
      </Helmet>
      <JsonLd data={recipeJsonLd({ recipe, slug: recipeSlug })} />
      <JsonLd data={breadcrumbJsonLd([
        { name: 'Home', url: '/' },
        { name: 'Recipes', url: '/recipes' },
        { name: title, url: `/recipes/${recipeSlug}` },
      ])} />
      <div>
        <div className='bg-pink py-5'>
          <div className="container pt-3 mt-5">
            <h2 className='text-uppercase text-center recipe-detailed-heading'>Must Try Party Recipes</h2>
            <div className="row align-items-center pt-5">
              <div className="col-md-6 py-4 text-center">
                <OptimizedImage src={featuredImage.url} alt={featuredImage.title} className="w-75" loading="lazy" responsive={true} />
              </div>
              <div className="col-md-6 py-4">
                <h1 className="recipe-detailed-title">{title}</h1>
                <div className="recipe-steps mt-4">
                  <ReactMarkdown>{recipeSteps}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PartyMoreFun />
      </div>
    </>
  );
};

export default RecipeDetail;
