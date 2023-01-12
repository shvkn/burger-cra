import React, { useMemo } from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import styles from './order.module.css';
import { orderPropTypes } from '../../utils/prop-types';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsSelectors from '../../services/selectors/ingredients';
import { useSelector } from 'react-redux';
import { OrderStatuses } from '../../utils/constants';
import _ from 'lodash';

const visibleIngredientsCount = 6;

function Order({ order, showStatus = false }) {
  const { url } = useRouteMatch();
  const location = useLocation();

  const status = useMemo(() => OrderStatuses[order.status.trim().toLowerCase()], [order]);
  const date = new Date(order.createdAt);

  const ingredientsEntities = useSelector(ingredientsSelectors.selectEntities);
  const orderIngredients = order.ingredients.map((id) => ingredientsEntities[id]);
  const reversedVisibleIngredients = orderIngredients.slice(0, visibleIngredientsCount).reverse();
  const extra = Math.max(orderIngredients.length - visibleIngredientsCount, 0);

  const totalPrice = useMemo(() => {
    const ingredientsCounts = _.countBy(order.ingredients);
    return _.sumBy(orderIngredients, ({ _id, price }) => ingredientsCounts[_id] * price);
  }, [order.ingredients, orderIngredients]);

  return (
    <Link
      to={{ pathname: `${url}/${order._id}`, state: { background: location } }}
      className={`pt-6 pr-6 pb-6 pl-6 ${styles.order}`}
    >
      <div className={styles.line}>
        <p className={`text text_type_digits-default ${styles.number}`}>{`#${order.number}`}</p>
        <p className={`ml-4 text text_type_main-default text_color_inactive ${styles.timestamp}`}>
          <FormattedDate date={date} />
        </p>
      </div>
      <div className={`mt-6 ${styles.line} ${styles.column}`}>
        <p className={`text text_type_main-medium`}>{order.name}</p>
        {showStatus && (
          <p
            className={`mt-2 text text_type_main-small ${
              order.status === 'done' && 'text_color_success'
            }`}
          >
            {status}
          </p>
        )}
      </div>
      <div className={`mt-6 ${styles.line}`}>
        <ul className={styles.ingredients}>
          {reversedVisibleIngredients.map((ingredient, idx) => (
            <li key={idx} className={styles.ingredient}>
              <img
                className={styles.ingredientImage}
                src={ingredient.image}
                alt={ingredient.name}
              />
              {extra > 0 && idx === 0 && (
                <div className={styles.extra}>
                  <p
                    className={`text text_type_main-default ${styles.extraCount}`}
                  >{`+${extra}`}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className={`ml-6 ${styles.price}`}>
          <p className='mr-2 text text_type_digits-default'>{totalPrice}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </Link>
  );
}

Order.propTypes = orderPropTypes.isRequired;

export default Order;
