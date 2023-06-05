import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { canonicalURL, twitterHandle, ogImage,author } from '../seoConstant';
import { homePageKeywords,homePageDescription } from '../seoConstant';
const PageTitle = ({ title, description, keywords}) => {
  // !keywords than use homePageKeywords
  keywords = keywords ? keywords : homePageKeywords;
  description = description ? description : homePageDescription;
  title = title ? title : 'Animart.in';
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:creator" content={twitterHandle} />
      <link rel="canonical" href={canonicalURL} />
    </Helmet>
  );
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.string.isRequired,
};

export default PageTitle;
