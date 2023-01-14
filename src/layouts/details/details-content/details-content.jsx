import React from 'react';
import PropTypes from 'prop-types';

function DetailsContent({ children }) {
  return <>{children}</>;
}

DetailsContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DetailsContent;
