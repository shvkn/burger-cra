import React, { FC, useMemo } from 'react';
import styles from './order-info.module.css';
// import OrderStatus from 'components/order-status';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientModel } from 'entities/ingredient';
import { countBy, getOrderIngredients, getOrderTotalPrice } from 'shared/lib';

type TOrderInfoProps = {
  order: TOrder;
};

const OrderInfo: FC<TOrderInfoProps> = ({ order }) => {
  const { entities: ingredientsEntities } = ingredientModel.useIngredients();

  const ingredients = useMemo(
    () => getOrderIngredients(order, ingredientsEntities),
    [ingredientsEntities, order]
  );

  const totalPrice = useMemo(
    () => getOrderTotalPrice(order, ingredientsEntities),
    [ingredientsEntities, order]
  );

  const uniqIngredients = useMemo(
    () => ingredients.filter((i, idx, arr) => arr.indexOf(i) === idx),
    [ingredients]
  );

  const ingredientsCounts = useMemo(() => countBy(ingredients, (i) => i._id), [ingredients]);

  return (
    <article className={styles.container}>
      <h1 className={'mt-5 text text_type_main-medium'}>{order.name}</h1>
      <p
        className={`mt-2 text text_type_main-default ${
          order.status === 'done' && 'text_color_success'
        }`}
      >
        {/*<OrderStatus status={order.status} />*/}
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
