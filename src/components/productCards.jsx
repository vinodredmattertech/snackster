import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';

// const client = new ApolloClient({
//   uri: 'https://graphql.contentful.com/content/v1/spaces/xpevfus5shq2/environments/master',
//   cache: new InMemoryCache(),
//   headers: {
//     Authorization: `Bearer 8ARiS060IpbMEQygIiKxprhonFFgvfMwj4_OBnzPP-A`
//   }
// });

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

const ProductShowcase = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ]
  };

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
    <div className="bg-yellow products">
      <img src='images/Let’s-Begin-the-Party.svg' className='pb-5 d-none d-md-block' alt='Lets Begin the Party' />
      <img src='images/Let’s-Begin-the-Party-mob.svg' className='pb-5 d-block d-md-none' alt='Lets Begin the Party' />
      {/* <div className="container d-none d-md-block">
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
                  <img src={product.image} alt={product.name} className="img-fluid" loading="lazy" />
                </div>
                <div className="add-to-cart-btn text-center">
                  <a href={product.url} className="btn add-party-btn">Add To The Party</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      <div className="container pb-5">
        <Slider {...settings}>
          {products.map(product => (
            <div key={product.id} className="product-card p-3 h-100">
              <div className="product-title mb-2">
                <span>{product.tag}</span> <br />
                {product.name.split(' ').map((part, index) => (
                  <React.Fragment key={index}>
                    {part} <br />
                  </React.Fragment>
                ))}
              </div>
              <div className="product-image text-center mb-3">
                <center><img src={product.image} alt={product.name} className="img-fluid" loading="lazy" /></center>
              </div>
              <div className="add-to-cart-btn text-center">
                <Link to={product.url} className="btn add-party-btn">Add To The Party</Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default ProductShowcase;
