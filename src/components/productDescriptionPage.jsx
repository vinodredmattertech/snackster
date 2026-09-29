import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import PartyMoreFun from './recipeSection';
import CrossMarquee from '../components/crossMarquee';
import Lottie from 'lottie-react';
import circleRing from '../animations/circle-ring.json';
import orangeBounce from '../animations/orange-bounce.json';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Icon } from '@iconify/react';
import starFilled from '@iconify-icons/mdi/star';
import starOutline from '@iconify-icons/mdi/star-outline';
import MarqueeSlider from './pdpMarqueeSlider';
import AlwaysPartySlider from './pdpAlwaysParty';
import CategoryComponent from './pdpCategory';
import ReactMarkdown from 'react-markdown';
// import spar from '../images/Spar.svg';
// import Vijetha from '../images/vijetha.png';
// import QMart from '../images/qmart.png';
import { Helmet } from 'react-helmet-async';
import JsonLd from './JsonLd';
import { breadcrumbJsonLd, faqJsonLd, productJsonLd, withBrandTitle } from '../utils/seo';
import NotFound from './NotFound';
import OptimizedImage from './OptimizedImage';
import { IMAGE_SIZES } from '../config/imageConfig';
const GET_PRODUCT_DETAIL = gql`
  query GetProductDetail($productUrl: String!) {
    productsCollection(where: { productUrl: $productUrl }) {
      items {
        productName
        productUrl
        metaTitle
        metaDescription
        productDescription
        productHighlightDescription
        productHighlightImage {
          url
          title
        }
        productVideo {
          url
          title
        }
        productFeaturedImage {
          url
          title
        }
        productGalleryCollection(limit: 10) {
          items {
            url
            title
          }
        }
        productRating
        zeptoUrl
        amazonFreshUrl
        bigBasketUrl
        blinkitUrl
        swiggyInstamartUrl
        nutritionFactsImage {
          url
          title
        }
        oilFryMethod
        deepFryText
        dryFryMethod  
        airFryText
        faqsCollection(limit: 10) {
          items {
            question
            answer
          }
        }
      }
    }
  }
`;

const ProductDetail = () => {
  const { productUrl } = useParams();
  const { loading, error, data } = useQuery(GET_PRODUCT_DETAIL, {
    variables: { productUrl },
  });
  const hideRulesFor = ["chicken-cocktail-sausage", "chicken-breakfast-sausage"];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const product = data?.productsCollection?.items?.[0];
  if (!product) return <NotFound />;

  const images = [
    {
      original: product.productFeaturedImage.url,
      thumbnail: product.productFeaturedImage.url,
    },
    ...product.productGalleryCollection.items.map(image => ({
      original: image.url,
      thumbnail: image.url,
    }))
  ];

  const [tag, ...nameParts] = product.productName.split(' ');
  const name = nameParts.join(' ');

  const rating = Math.round(product.productRating);
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 > 0 ? 1 : 0;
  const emptyStars = 5 - (fullStars + halfStars);
  const faqs = product.faqsCollection?.items || [];
  const pageTitle = withBrandTitle(product.metaTitle);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={product.metaDescription} />
        <link rel="canonical" href={`https://www.snackster.co.in/products/${product.productUrl}`} />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={product.metaDescription} />
        <meta property="og:url" content={`https://www.snackster.co.in/products/${product.productUrl}`} />
        <meta property="og:image" content={product.productFeaturedImage.url} />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="1080" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={product.metaDescription} />
        <meta name="twitter:image" content={product.productFeaturedImage.url} />
      </Helmet>
      <JsonLd data={productJsonLd(product)} />
      {faqs.length > 0 && <JsonLd data={faqJsonLd(faqs)} />}
      <JsonLd data={breadcrumbJsonLd([
        { name: 'Home', url: '/' },
        { name: 'Products', url: '/products' },
        { name: product.productName, url: `/products/${product.productUrl}` },
      ])} />
      <div className='product-detail'>
        <div className='pdp-hero'>
          <div className='container pt-5'>
            <Breadcrumbs aria-label="breadcrumb" className='my-4'>
              <Link underline="hover" color="#ffffffbf" component={RouterLink} to="/">
                Home
              </Link>
              <Link underline="hover" color="#ffffffbf" component={RouterLink} to="/products">
                Products
              </Link>
              <Typography color="white">{product.productName}</Typography>
            </Breadcrumbs>

            <div className='row pt-3'>
              <div className='col-md-6'>
                <ImageGallery items={images} autoPlay={false} showNav={false} showPlayButton={false} showFullscreenButton={false} slideOnThumbnailOver={true} />
              </div>
              <div className='col-md-6'>
                <div className="pdp-product-title mb-2">
                  <h1 className='d-none'>{product.productName}</h1>
                  <span>{tag}</span> <br />
                  {name.split(' ').map((part, index) => (
                    <React.Fragment key={index}>
                      {part} <br />
                    </React.Fragment>
                  ))}
                </div>
                <div className="rating mb-3">
                  {[...Array(fullStars)].map((_, index) => (
                    <Icon key={index} icon={starFilled} className="rating-star" />
                  ))}
                  {[...Array(halfStars)].map((_, index) => (
                    <Icon key={index + fullStars} icon={starOutline} className="rating-star" />
                  ))}
                  {[...Array(emptyStars)].map((_, index) => (
                    <Icon key={index + fullStars + halfStars} color='#FFD401' icon={starOutline} className="rating-star" />
                  ))}
                </div>
                <ReactMarkdown>{product.productDescription}</ReactMarkdown>
                <div className='row my-2 snackster-usp'>
                  <div className='col-md-4 col-6 d-flex align-items-center py-2'>
                    <OptimizedImage src='/images/no-antibiotics.svg' alt='no antibiotics' loading="lazy" /><p className='mx-2'>No<br />Antibiotics</p>
                  </div>
                  <div className='col-md-4 col-6 d-flex align-items-center py-2'>
                    <OptimizedImage src='/images/no-steroids.svg' alt='no steroids' loading="lazy" /><p className='mx-2'>No<br />Steroids</p>
                  </div>
                  <div className='col-md-4 col-6 d-flex align-items-center py-2'>
                    <OptimizedImage src='/images/no-msg.svg' alt='no added msg' loading="lazy" /><p className='mx-2'>No<br />Added MSG</p>
                  </div>
                </div>
                <button className='now-available' disabled>Now available at</button>
                <div className='d-flex align-items-center'>
                  {product.swiggyInstamartUrl && <p><a href={product.swiggyInstamartUrl} target='_blank' rel='noopener noreferrer'><OptimizedImage src='/images/available-on/swiggy-instamart.png' width={72} alt="order on swiggy instamart" loading="lazy" /></a></p>}
                  {/* {product.blinkitUrl && <p><a href={product.blinkitUrl} target='_blank' rel='noopener noreferrer'><OptimizedImage src='/images/available-on/blinkit.png' width={72} alt="order on blink it" loading="lazy" /></a></p>} */}
                  {product.amazonFreshUrl && <p><a href={product.amazonFreshUrl} target='_blank' rel='noopener noreferrer'><OptimizedImage src='/images/available-on/fresh.png' width={72} alt="order on amazon fresh" loading="lazy" /></a></p>}
                  {product.zeptoUrl && <p><a href={product.zeptoUrl} target='_blank' rel='noopener noreferrer'><OptimizedImage src='/images/available-on/zepto.png' width={72} alt="order on blink it" loading="lazy" /></a></p>}  
                  {product.bigBasketUrl && <p><a href={product.bigBasketUrl} target='_blank' rel='noopener noreferrer'><OptimizedImage src='/images/available-on/bb.png' width={72} alt="order on big basket" loading="lazy" /></a></p>}
                  <p><a href="https://www.naturesbasket.co.in/" target='_blank' rel='noopener noreferrer'><OptimizedImage src='/images/available-on/nature-basket.png' alt="Available on" width={72} loading="lazy" /></a> </p>
                </div>
                <button className='now-available' disabled>Also available at</button>
                <div className='d-flex align-items-center'>
                  <OptimizedImage src='/images/available-on/vijetha.png' alt="Available on" style={{ maxWidth: '54px' }} loading="lazy" />
                  <OptimizedImage src='/images/available-on/qmart.png' alt="Available on" style={{ maxWidth: '54px' }} loading="lazy" />
                  <OptimizedImage src='/images/available-on/spar.png' alt="Available on" style={{ maxWidth: '54px' }} loading="lazy" />
                  <OptimizedImage src='/images/available-on/mk-retail.png' alt="Available on" style={{ maxWidth: '54px' }} loading="lazy" />
                  <OptimizedImage src='/images/available-on/mango.png' alt="Available on" style={{ maxWidth: '54px' }} loading="lazy" />
                  <OptimizedImage src='/images/landing/metro.png' alt="Available on" style={{ maxWidth: '54px' }} loading="lazy" />
                  <OptimizedImage src='/images/available-on/ratnadeep.png' alt="Available on" style={{ maxWidth: '54px' }} loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=''>
          <video 
            src={product.productVideo?.url}  
            autoPlay 
            loop
            muted
            className='w-100' 
            loading="lazy" 
            poster={product.productFeaturedImage?.url}
          />
        </div>

        <AlwaysPartySlider />

        <div className='bg-yellow mb-3 py-4'>
          <div className='container'>
            <div className='row align-items-center'>
              <div className='col-md-6 order-md-1 order-2'>
                <div className="optimized-product-image-container">
                  <div className="pdp-background-shape3"></div>
                  <div className='cook-steps-content'>
                    <h2 className='text-center py-3'>
                      PARTY RULES:
                      <br />
                      {!hideRulesFor.includes(productUrl) && "DO NOT THAW"}
                    </h2>
                    <div className='row align-items-center py-2'>
                      <div className='col-4 text-center'>
                        <OptimizedImage src='../images/deep_fry.svg' alt='Deep fry' width={70} loading="lazy" />
                      </div>
                      <div className='col-8 text-left'>
                        <h3>{product.oilFryMethod}</h3>
                        <p>{product.deepFryText}</p>
                      </div>
                    </div>
                    <div className='row align-items-center py-2'>
                      <div className='col-4 text-center'>
                        <OptimizedImage src='../images/air_fry.svg' alt='Air fry' width={60} loading="lazy" />
                      </div>
                      <div className='col-8'>
                        <h3>{product.dryFryMethod}</h3>
                        <p>{product.airFryText}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-6 order-md-2 py-4 order-1 amin-sec'>
                <center>
                  <Lottie
                    animationData={orangeBounce}
                    loop={true}
                    style={{ width: '70%' }}
                  />
                </center>
                <div className='pdp-anim-text3 text-center'>Cooking<br />Steps</div>
              </div>
            </div>
          </div>
        </div>

        <CrossMarquee />

        <div className='pt-5 bg-purple'>
          <div className='container'>
            <div className='row align-items-center'>
              <div className='col-md-6 order-md-2 order-2'>
                <div className="text-center">
                  {product.nutritionFactsImage && (
                    <>
                      <OptimizedImage src={product.nutritionFactsImage.url} alt={product.nutritionFactsImage.title} className='w-75 d-none d-md-block' loading="lazy" responsive={true} />
                      <OptimizedImage src={product.nutritionFactsImage.url} alt={product.nutritionFactsImage.title} className='w-100 d-block d-md-none' loading="lazy" responsive={true} />
                    </>
                  )}
                </div>
              </div>
              <div className='col-md-6 order-md-1 py-4 order-1 amin-sec'>
                <center>
                  <Lottie
                    animationData={circleRing}
                    loop={true}
                    style={{ width: '70%' }}
                  />
                </center>
                <div className='pdp-anim-text2 text-center'>Nutrition<br /> Facts</div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-blue py-5'>
          <div className='container'>
            <div className='row align-items-center'>
              <div className='col-md-6'>
                <div className='product-highlight-image'>
                  <OptimizedImage src={product.productHighlightImage.url} alt={product.productHighlightImage.title} className='w-100' loading="lazy" responsive={true} />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='text-white'>
                  <ReactMarkdown>{product.productHighlightDescription}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>

        <MarqueeSlider />
        <CategoryComponent />
        <div className='container my-5'>
          <div className='product-faqs'>
            <h2 className='heading-text'>FAQs</h2>
            <div className="accordion accordion-flush" id="accordionFlushExample">
              {faqs.map((faq, index) => (
                <div className="accordion-item" key={index}>
                  <h2 className="accordion-header" id={`flush-heading${index}`}>
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${index}`} aria-expanded="false" aria-controls={`flush-collapse${index}`}>
                      {faq.question}
                    </button>
                  </h2>
                  <div id={`flush-collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`flush-heading${index}`} data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">{faq.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <PartyMoreFun />
      </div>
    </>
  );
};

export default ProductDetail;
