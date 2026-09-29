import { Navigate, Route, Routes } from 'react-router-dom';
import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import ScrollToTop from './components/RouteScrollTop';
import TrailingSlashRedirect from './components/TrailingSlashRedirect';
import Layout from './components/Layout';
import Home from './pages/Home';
import LandingPageHyd from './pages/LandingPageHyd';
import LandingPageBang from './pages/LandingPageBang';
import LandingPageMumbai from './pages/LandingPageMumbai';
import PartySnack from './components/AboutSnackster';
import ProductPage from './components/ProductPage';
import RecipePage from './components/recipePage';
import ProductCollections from './components/ProductCollections';
import { HelmetProvider } from 'react-helmet-async';
import TrackPageView from './components/TrackPageView';
import BlogsPage from './components/blogPage';
import BlogDetail from './components/blogDetailed';
import NotFound from './components/NotFound';


const ProductDes = React.lazy(() => import('./pages/ProductDes'));
const RecipeDetail = React.lazy(() => import('./components/recipeDetailed'));

function App() {
  useEffect(() => {
    Aos.init({
      once: true,
    });
  }, []);

  return (
    <>
      <TrailingSlashRedirect />
      <ScrollToTop />
      <TrackPageView />
      <HelmetProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<PartySnack />} />
          <Route path="/products" element={<ProductPage />} />
          <Route 
            path="/products/:productUrl" 
            element={<React.Suspense fallback={<div>Loading...</div>}>
                        <ProductDes />
                      </React.Suspense>} 
          />
          <Route path="/recipes" element={<RecipePage />} />
          <Route path="/recipes/:recipeSlug" element={<React.Suspense fallback={<div>Loading...</div>}>
                        <RecipeDetail />
                      </React.Suspense>} />
          <Route path="/collections/:collectionUrl" element={<ProductCollections />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:blogUrl" element={<React.Suspense fallback={<div>Loading...</div>}>
                        <BlogDetail />
                      </React.Suspense>} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/party-snacks-hyderabad" element={<LandingPageHyd />} />
        <Route path="/party-snacks-Hyderabad" element={<Navigate to="/party-snacks-hyderabad" replace />} />
        <Route path="/party-snacks-bangalore" element={<LandingPageBang />} />
        <Route path="/party-snacks-mumbai" element={<LandingPageMumbai />} />

      </Routes>
      </HelmetProvider>
    </>
  );
}

export default App;
