import React, { useMemo } from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import styles from './order.module.css';
import { orderPropTypes } from 'utils/prop-types';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import OrderStatus from 'components/order-status';
import PropTypes from 'prop-types';
import { OrderStatuses } from 'utils/constants';
import ingredientsSelectors from 'services/selectors/ingredients';
import _ from 'lodash';

const ingredientsToRenderCount = 6;

function Order({ order, hideStatus = false }) {
  const { url } = useRouteMatch();
  const location = useLocation();
  const ingredientsEntities = useSelector(ingredientsSelectors.selectEntities);

  const orderIngredients = useMemo(() => {
    return order.ingredients
      .map((id) => ingredientsEntities[id])
      .filter((ingredient) => ingredient !== undefined && ingredient !== null);
  }, [order.ingredients, ingredientsEntities]);

  const totalPrice = useMemo(() => {
    return _.sumBy(orderIngredients, 'price');
  }, [orderIngredients]);

  const ingredientsToRender = useMemo(() => {
    return orderIngredients.slice(0, ingredientsToRenderCount).reverse();
  }, [orderIngredients]);

  const extraIngredientsCount = useMemo(() => {
    return Math.max(orderIngredients.length - ingredientsToRenderCount, 0);
  }, [orderIngredients]);

  return (
    <Link
      to={{ pathname: `${url}/${order._id}`, state: { background: location } }}
      className={`pt-6 pr-6 pb-6 pl-6 ${styles.container}`}
    >
      <div className={styles.row}>
        <p className={`text text_type_digits-default ${styles.number}`}>{`#${order.number}`}</p>
        <p className={`ml-4 text text_type_main-default text_color_inactive ${styles.timestamp}`}>
          <FormattedDate date={new Date(order.createdAt)} />
        </p>
      </div>
      <div className={`mt-6`}>
        <p className={`text text_type_main-medium`}>{order.name}</p>
        {!hideStatus && (
          <p
            className={`mt-2 text text_type_main-small ${
              order.status === OrderStatuses.DONE && 'text_color_success'
            }`}
          >
            <OrderStatus status={order.status} />
          </p>
        )}
      </div>
      <div className={`mt-6 ${styles.row}`}>
        <ul className={styles.ingredients}>
          {ingredientsToRender.map((ingredient, idx) => (
            <li key={idx} className={styles.ingredient}>
              <img
                className={styles.ingredientImage}
                src={ingredient.image}
                alt={ingredient.name}
              />
              {idx === 0 && extraIngredientsCount > 0 && (
                <div className={styles.extra}>
                  <p
                    className={`text text_type_main-default ${styles.extraCount}`}
                  >{`+${extraIngredientsCount}`}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className={`ml-6 ${styles.price}`}>
          <p className={`mr-2 text text_type_digits-default`}>{totalPrice}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </Link>
  );
}

Order.propTypes = {
  order: orderPropTypes.isRequired,
  hideStatus: PropTypes.bool,
};

export default Order;
