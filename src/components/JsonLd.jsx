import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function JsonLd({ data }) {
  if (!data) return null;

  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <Helmet>
      <script type="application/ld+json">{json}</script>
    </Helmet>
  );
}
