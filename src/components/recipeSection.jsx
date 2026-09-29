import React from 'react';
import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import Slider from 'react-slick';

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

const PartyMoreFun = () => {
  const { loading, error, data } = useQuery(GET_RECIPES);

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: '10%',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '10%',
        },
      },
    ],
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const recipes = data.recipeCollection.items.map((recipe, index) => ({
    id: index,
    title: recipe.title,
    image: recipe.recipeCardImage.url,
    url: `recipes/${recipe.recipeUrl}`,
  }));

  return (
    <div className="party-more-fun-container">
      <h2 className="party-title pt-5 text-center">LET'S MAKE PARTY MORE FUN</h2>
      <div id='recipes' className="container-fluid p-0  mt-5 mb-4">
        <Slider {...settings}>
          {recipes.map((recipe) => (
            <div key={recipe.id} className="slider-item">
              <Link to={`/${recipe.url}`}>
                <div className="recipe-card" style={{ backgroundImage: `url(${recipe.image})` }}>
                  <div className="recipe-title">{recipe.title}</div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default PartyMoreFun;
