import { useSelector } from 'react-redux';
import ordersSelectors from '../../../services/selectors/orders';
import _ from 'lodash';
import styles from './order-info-content.module.css';
import OrderStatus from '../../order-status/order-status';
import { OrderStatuses } from '../../../utils/constants';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { orderPropTypes } from '../../../utils/prop-types';

export function OrderInfoContent({ order }) {
  const ingredients = useSelector(ordersSelectors.ingredients(order._id));
  const totalPrice = useSelector(ordersSelectors.totalPrice(order._id));
  const uniqIngredients = _.uniqBy(ingredients, '_id');
  const ingredientsCounts = _.countBy(order.ingredients);

  return (
    <article className={styles.container}>
      <h1 className={'mt-5 text text_type_main-medium'}>{order.name}</h1>
      <OrderStatus
        status={order.status}
        className={`mt-2 text text_type_main-default ${
          order.status === OrderStatuses.DONE && 'text_color_success'
        }`}
      />
      <h2 className={'mt-15 mb-6 text text_type_main-medium'}>Состав:</h2>
      <ul className={`${styles.ingredients} scroll`}>
        {uniqIngredients.map((ingredient) => (
          <li key={ingredient._id} className={`mt-4 mr-6 ${styles.ingredient}`}>
            <img className={styles.ingredientImage} src={ingredient.image} alt={ingredient.name} />
            <p className={`ml-4 text text_type_main-default ${styles.ingredientName}`}>
              {ingredient.name}
            </p>
            <div className={`ml-4 ${styles.price}`}>
              <p className='mr-2 text text_type_digits-default'>{`${
                ingredientsCounts[ingredient._id]
              } x ${ingredient.price}`}</p>
              <CurrencyIcon type='primary' />
            </div>
          </li>
        ))}
      </ul>
      <div className={`mt-10 mb-10 ${styles.panel}`}>
        <FormattedDate
          date={new Date(order.createdAt)}
          className={`text text_type_main-default text_color_inactive ${styles.date}`}
        />
        <div className={`ml-2 ${styles.price}`}>
          <p className='mr-2 text text_type_digits-default'>{totalPrice}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </article>
  );
}

OrderInfoContent.propTypes = {
  order: orderPropTypes.isRequired,
};
