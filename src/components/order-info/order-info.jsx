import React, { useMemo } from 'react';
import { orderPropTypes } from 'utils/prop-types';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import styles from './order-info.module.css';
import OrderStatus from 'components/order-status';
import { OrderStatuses } from 'utils/constants';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsSelectors from 'services/selectors/ingredients';

function OrderInfo({ order }) {
  const ingredientsEntities = useSelector(ingredientsSelectors.selectEntities);
  const ingredients = useMemo(() => {
    return order.ingredients
      .map((id) => ingredientsEntities[id])
      .filter((ingredient) => !!ingredient);
  }, [order.ingredients, ingredientsEntities]);
  const totalPrice = _.sumBy(ingredients, 'price');

  const uniqIngredients = useMemo(() => _.uniqBy(ingredients, '_id'), [ingredients]);
  const ingredientsCounts = useMemo(() => _.countBy(order.ingredients), [order.ingredients]);

  return (
    <article className={styles.container}>
      <h1 className={'mt-5 text text_type_main-medium'}>{order.name}</h1>
      <p
        className={`mt-2 text text_type_main-default ${
          order.status === OrderStatuses.DONE && 'text_color_success'
        }`}
      >
        <OrderStatus status={order.status} />
      </p>
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

OrderInfo.propTypes = {
  order: orderPropTypes.isRequired,
};

export default OrderInfo;
