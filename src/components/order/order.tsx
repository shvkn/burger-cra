import React, { FC, useMemo } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styles from './order.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderStatus from 'components/order-status';
import ingredientsSelectors from 'services/selectors/ingredients';
import _ from 'lodash';
import { TIngredient, TOrder } from 'services/types/data';
import { useAppLocation, useAppSelector } from 'services/slices';

const ingredientsToRenderCount = 6;

type TOrderProps = {
  order: TOrder;
  hideStatus?: boolean;
};

const Order: FC<TOrderProps> = ({ order, hideStatus = false }) => {
  const { url } = useRouteMatch();
  const location = useAppLocation();
  const ingredientsEntities = useAppSelector(ingredientsSelectors.selectEntities);
  // TODO Вынести в общий функционал
  const orderIngredients = useMemo(() => {
    return order.ingredients
      .map((id) => ingredientsEntities[id])
      .filter((ingredient): ingredient is TIngredient => !!ingredient);
  }, [order.ingredients, ingredientsEntities]);
  // TODO Вынести в общий функционал. Выпилить lodash
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
              order.status === 'done' && 'text_color_success'
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
};

export default Order;