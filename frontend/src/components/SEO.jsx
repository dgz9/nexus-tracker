import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'NexusTrack', 
  description = 'Transform your workflow with powerful task management',
  keywords = 'task management, project management, team collaboration',
  url = 'https://nexustracker.com',
  image = 'https://nexustracker.com/og-image.png',
  type = 'website'
}) => {
  const fullTitle = title === 'NexusTrack' ? title : `${title} | NexusTrack`;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;