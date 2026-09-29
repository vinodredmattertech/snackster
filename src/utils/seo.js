export const SITE_URL = 'https://www.snackster.co.in';
export const SITE_NAME = 'Snackster';
export const LOGO_URL = `${SITE_URL}/images/snackster_logo.svg`;

const compact = (value) => {
  if (Array.isArray(value)) return value.map(compact).filter(Boolean);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .map(([key, nestedValue]) => [key, compact(nestedValue)])
        .filter(([, nestedValue]) => {
          if (Array.isArray(nestedValue)) return nestedValue.length > 0;
          return nestedValue !== undefined && nestedValue !== null && nestedValue !== '';
        }),
    );
  }
  return value;
};

export const absoluteUrl = (path = '') => {
  // Homepage canonical must be without trailing slash
  if (!path || path === '/') return SITE_URL;
  if (/^https?:\/\//i.test(path)) {
    try {
      const url = new URL(path);
      if (url.pathname === '/' || url.pathname === '') {
        return SITE_URL;
      }
      if (url.pathname.endsWith('/')) {
        url.pathname = url.pathname.replace(/\/+$/, '');
      }
      return url.href.replace(/\/$/, '');
    } catch {
      return path.replace(/\/$/, '');
    }
  }
  const cleanPath = `/${String(path).replace(/^\/+|\/+$/g, '')}`;
  return `${SITE_URL}${cleanPath}`;
};

/** Ensures title ends with "| Snackster" once (no duplicates). */
export const withBrandTitle = (title = '') => {
  const cleaned = String(title || '')
    .replace(/(\s*[|\-–—]\s*Snackster)+\s*$/gi, '')
    .trim();
  return cleaned ? `${cleaned} | Snackster` : SITE_NAME;
};

export const stripMarkdown = (text = '') =>
  text
    .replace(/!\[[^\]]*]\([^)]*\)/g, '')
    .replace(/\[[^\]]*]\(([^)]*)\)/g, '$1')
    .replace(/[#>*_`~-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

export const organizationJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: LOGO_URL,
  sameAs: [
    'https://www.facebook.com/sneha.snackster',
    'https://twitter.com/SnehaSnackster',
    'https://instagram.com/sneha.snackster',
    'https://www.youtube.com/@sneha.snackster',
  ],
});

export const websiteJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { '@id': `${SITE_URL}/#organization` },
});

export const webPageJsonLd = ({ name, url, description, text }) => compact({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name,
  url: absoluteUrl(url),
  description,
  text,
  isPartOf: { '@id': `${SITE_URL}/#website` },
  publisher: { '@id': `${SITE_URL}/#organization` },
});

export const breadcrumbJsonLd = (items) => compact({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.url),
  })),
});

export const itemListJsonLd = ({ name, url, items }) => compact({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name,
  url: absoluteUrl(url),
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name || item.title,
    url: absoluteUrl(item.url),
  })),
});

export const productJsonLd = (product) => compact({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.productName,
  description: stripMarkdown(product.productDescription || product.metaDescription),
  image: [
    product.productFeaturedImage?.url,
    ...(product.productGalleryCollection?.items || []).map((image) => image.url),
  ],
  brand: {
    '@type': 'Brand',
    name: SITE_NAME,
  },
  url: absoluteUrl(`/products/${product.productUrl}`),
});

export const faqJsonLd = (faqs = []) => compact({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: stripMarkdown(faq.answer),
    },
  })),
});

export const recipeJsonLd = ({ recipe, slug }) => compact({
  '@context': 'https://schema.org',
  '@type': 'Recipe',
  name: recipe.title,
  description: recipe.metaDescription,
  image: recipe.featuredImage?.url,
  author: {
    '@type': 'Organization',
    name: SITE_NAME,
  },
  recipeInstructions: stripMarkdown(recipe.recipeSteps),
  url: absoluteUrl(`/recipes/${slug}`),
});

export const blogPostingJsonLd = ({ blog, slug }) => compact({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: blog.title,
  description: blog.metaDescription,
  image: blog.featuredImage?.url,
  author: {
    '@type': 'Organization',
    name: SITE_NAME,
  },
  publisher: { '@id': `${SITE_URL}/#organization` },
  mainEntityOfPage: absoluteUrl(`/blogs/${slug}`),
});
