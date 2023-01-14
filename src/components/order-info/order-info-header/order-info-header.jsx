import styles from './order-info-header.module.css';
import React from 'react';
import { orderPropTypes } from '../../../utils/prop-types';

export function OrderInfoHeader({ order }) {
  return <p className={`text text_type_digits-default ${styles.number}`}>{`#${order.number}`}</p>;
}

OrderInfoHeader.propTypes = {
  order: orderPropTypes.isRequired,
};
