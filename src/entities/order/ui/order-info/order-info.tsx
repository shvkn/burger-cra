import React, { FC, useMemo } from 'react';
import styles from './order-info.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { countBy } from 'shared/lib';
import { calcTotalPrice, getOrderStatus } from '../lib';
import { clsx } from 'clsx';

type TOrderInfoProps = {
  order: TOrder;
  mapIngredientsFn: (order: TOrder) => TIngredient[];
};

const OrderInfo: FC<TOrderInfoProps> = ({ order, mapIngredientsFn }) => {
  const ingredients = mapIngredientsFn(order);
  const totalPrice = useMemo(() => calcTotalPrice(ingredients), [ingredients]);
  const uniqIngredients = useMemo(
    () => ingredients.filter((i, idx, arr) => arr.indexOf(i) === idx),
    [ingredients]
  );
  const ingredientsCounts = useMemo(() => countBy(ingredients, (i) => i._id), [ingredients]);

  return (
    <article className={styles.container}>
      <h1 className={'mt-5 text text_type_main-medium'}>{order.name}</h1>
      <p
        className={clsx(
          'mt-2 text text_type_main-small',
          order.status === 'done' && 'text_color_success'
        )}
      >
        {getOrderStatus(order.status)}
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
                ingredient.type === 'bun' ? 2 : ingredientsCounts[ingredient._id]
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
};

export default OrderInfo;
