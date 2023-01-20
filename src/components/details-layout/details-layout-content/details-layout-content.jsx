import React from 'react';
import PropTypes from 'prop-types';

function DetailsLayoutContent({ children }) {
  return <>{children}</>;
}

DetailsLayoutContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DetailsLayoutContent;
