import React from 'react';
import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import JsonLd from './JsonLd';
import { itemListJsonLd, webPageJsonLd } from '../utils/seo';

const pageDescription = 'Find easy party snack recipes using Snackster chicken snacks. Make sliders, wraps, bowls, rolls, stir fries, nachos, omelettes, and quick starters.';
const pageText = 'Turn Snackster ready to cook chicken snacks into easy party recipes that feel planned, even when the party is not. This recipe collection shows how nuggets, fingers, popcorn, sausages, seekh kebabs, and burger patties can become quick wraps, sliders, rolls, bowls, stir fries, omelettes, and loaded snack plates. Use these ideas when you need starters for friends, a quick snack for kids, a match-day platter, or a filling weekend meal. Most recipes begin with a Snackster product and build flavor with simple pantry ingredients, sauces, breads, vegetables, and dips. Pick a recipe below for step-by-step instructions and serving inspiration that keeps the cooking short and the party energy high.';

const GET_RECIPES = gql`
  query {
    recipeCollection {
      items {
        title
        recipeUrl
        recipeCardImage {
          url
          title
        }
      }
    }
  }
`;

const RecipePage = () => {
  const { loading, error, data } = useQuery(GET_RECIPES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const recipes = data.recipeCollection.items.map((recipe, index) => ({
    id: index,
    title: recipe.title,
    image: recipe.recipeCardImage.url,
    url: `recipes/${recipe.recipeUrl}`,
  }));

  return (
    <>
      <Helmet>
        <title>Easy Party Snack Recipes with Chicken Snacks | Snackster</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href="https://www.snackster.co.in/recipes" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Easy Party Snack Recipes with Chicken Snacks | Snackster" />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content="https://www.snackster.co.in/recipes" />
        <meta property="og:image" content="https://www.snackster.co.in/images/snackster_logo.svg" />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="1080" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Easy Party Snack Recipes with Chicken Snacks | Snackster" />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://www.snackster.co.in/images/snackster_logo.svg" />
        
        <meta name="twitter:site" content="@SnehaSnackster" />
        
        
        
        
        
      </Helmet>
      <JsonLd data={webPageJsonLd({
        name: 'Easy Party Snack Recipes',
        url: '/recipes',
        description: pageDescription,
        text: pageText,
      })} />
      <JsonLd data={itemListJsonLd({ name: 'Snackster Recipes', url: '/recipes', items: recipes })} />
      <div className="party-more-fun-container py-5">
        <h1 className="party-title mt-5 pt-5 text-center">Easy Party Snack Recipes</h1>
        <div className="container mt-5 mb-4">
          <div className="row">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="col-md-3">
                <Link to={`/${recipe.url}`}>
                  <div className="recipe-card" style={{ backgroundImage: `url(${recipe.image})` }}>
                    <div className="recipe-title">{recipe.title}</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipePage;
