import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import JsonLd from './JsonLd';
import { itemListJsonLd, webPageJsonLd } from '../utils/seo';
import OptimizedImage from './OptimizedImage';
import { IMAGE_SIZES } from '../config/imageConfig';

const GET_PRODUCTS_BY_COLLECTION = gql`
  query GetProductsByCollection($collectionUrl: String!) {
    productsCollection(where: { productCollection: { collectionUrl: $collectionUrl } }) {
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

const ProductCollections = () => {
  const { collectionUrl } = useParams();
  const collectionName = collectionUrl
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_COLLECTION, {
    variables: { collectionUrl }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const products = data.productsCollection.items.map((product, index) => {
    const [tag, ...nameParts] = product.productName.split(' ');
    const name = nameParts.join(' ');

    return {
      id: index,
      tag,
      name,
      title: product.productName,
      image: product.productFeaturedImage.url,
      url: `/products/${product.productUrl}`
    };
  });
  const pageDescription = `Explore Snackster ${collectionName} ready to cook chicken snacks for parties, quick starters, snack platters, and easy everyday meals.`;
  const pageText = `Explore the Snackster ${collectionName} collection for ready to cook chicken snacks that fit party menus, quick starters, and everyday snack cravings. Each product in this collection is made to reduce prep time while giving you a hot, satisfying snack that can be served on its own or built into wraps, sliders, bowls, rolls, and sharing platters. Use this page to compare products in the range, discover new freezer staples, and find a snack that works for the way you host. Whether you are planning for friends, family, kids, or an unplanned evening get-together, Snackster products help you move quickly from freezer to table with simple cooking steps and crowd-friendly flavors.`;

  return (
    <>
    <Helmet>
      <title>{collectionName} | Ready to Cook Chicken Snacks - Snackster</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={`https://www.snackster.co.in/collections/${collectionUrl}`} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${collectionName} | Ready to Cook Chicken Snacks - Snackster`} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={`https://www.snackster.co.in/collections/${collectionUrl}`} />
      <meta property="og:image" content="https://www.snackster.co.in/images/snackster_logo.svg" />
      <meta property="og:image:width" content="1080" />
      <meta property="og:image:height" content="1080" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${collectionName} | Ready to Cook Chicken Snacks - Snackster`} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={products[0]?.image} />
      
      <meta name="twitter:site" content="@SnehaSnackster" /> 
    </Helmet>
    <JsonLd data={webPageJsonLd({
      name: `${collectionName} Ready to Cook Chicken Snacks`,
      url: `/collections/${collectionUrl}`,
      description: pageDescription,
      text: pageText,
    })} />
    <JsonLd data={itemListJsonLd({ name: `Snackster ${collectionName}`, url: `/collections/${collectionUrl}`, items: products })} />
    <div className="bg-yellow py-5 products">
      <div className="container mt-5">
      <h1 className='text-center py-4'>{collectionName}</h1>
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
                  <Link to={product.url} className="btn add-party-btn">Add To The Party</Link>
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

export default ProductCollections;
