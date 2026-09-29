import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import JsonLd from './JsonLd';
import { itemListJsonLd, webPageJsonLd } from '../utils/seo';
import OptimizedImage from './OptimizedImage';

const pageDescription = 'Explore Snackster ready to cook chicken snacks online, including nuggets, kebabs, sausages, burger patties, popcorn, fingers, and frozen party snacks.';
const pageText = "Browse Snackster's full range of ready to cook chicken snacks made for parties, quick meals, and everyday cravings. From classic chicken nuggets and seekh kebabs to chicken popcorn, chicken fingers, burger patties, breakfast sausages, cocktail sausages, and samosas, each product is designed to help you serve hot snacks with minimal prep. These frozen snacks work well for house parties, kids' snack plates, office treats, movie nights, match screenings, and easy weekend dinners. Cook them straight from the freezer based on pack instructions, add your favorite dips or breads, and build snack boards, wraps, sliders, bowls, or quick starters. Choose a product below to see cooking steps, nutrition details, FAQs, and online store availability.";

const GET_PRODUCTS = gql`
  query {
    productsCollection {
      items {
        productName
        productUrl
        productFeaturedImage {
          url
          title
        }
      }
    }
  }
`;

const ProductPage = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const products = data.productsCollection.items.map((product, index) => {
    const [tag, ...nameParts] = product.productName.split(' ');
    const name = nameParts.join(' ');

    return {
      id: index,
      tag,
      name,
      image: product.productFeaturedImage.url,
      url: `products/${product.productUrl}`
    };
  });

  return (
    <>
      <Helmet>
        <title>Ready to Cook Chicken Snacks Online | Snackster Products</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href="https://www.snackster.co.in/products" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Ready to Cook Chicken Snacks Online | Snackster Products" />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content="https://www.snackster.co.in/products" />
        <meta property="og:image" content="https://www.snackster.co.in/images/snackster_logo.svg" />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="1080" />
        <meta property="og:title" content="Ready to Cook Chicken Snacks Online | Snackster Products" />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="https://www.snackster.co.in/images/snackster_logo.svg" />
        <meta property="og:url" content="https://www.snackster.co.in/products" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ready to Cook Chicken Snacks Online | Snackster Products" />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://www.snackster.co.in/images/snackster_logo.svg" />
        
        <meta name="twitter:site" content="@SnehaSnackster" />
        
        
        
        
        
        
        
      </Helmet>
      <JsonLd data={webPageJsonLd({
        name: 'Ready to Cook Chicken Snacks Online',
        url: '/products',
        description: pageDescription,
        text: pageText,
      })} />
      <JsonLd data={itemListJsonLd({ name: 'Snackster Products', url: '/products', items: products })} />
      <div className="bg-yellow py-5 products">
        <div className="container mt-5">
          <h1 className='text-center py-4'>Ready to Cook Chicken Snacks</h1>
          <div className="row">
            {products.map(product => (
              <div key={product.id} className="col-md-3">
                <div className="product-card p-3 h-100">
                  <div className="product-title mb-2">
                    <span>{product.tag}</span> <br />
                    {product.name.split(' ').map((part, index) => (
                      <React.Fragment key={index}>
                        {part} <br />
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="product-image text-center mb-3">
                    <OptimizedImage src={product.image} alt={product.name} className="img-fluid" loading="lazy" responsive={true} />
                  </div>
                  <div className="add-to-cart-btn text-center">
                    <Link to={`/${product.url}`} className="btn add-party-btn">Add To The Party</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
