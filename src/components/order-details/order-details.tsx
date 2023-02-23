import React, { FC } from 'react';
import styles from './order-details.module.css';
import doneImage from 'images/done.svg';

type TOrderDetailsProps = {
  number: number | string;
};

const OrderDetails: FC<TOrderDetailsProps> = ({ number }) => (
  <>
    <p className={`mt-30 text text_type_digits-large ${styles.id}`}>{number}</p>
    <p className={`mt-8 text text_type_main-medium`}>идентификатор заказа</p>
    <img className={`mt-15`} src={doneImage} alt='Заказ оформлен' />
    <p className={`mt-15 text text_type_main-default`}>Ваш заказ начали готовить</p>
    <p className={`mt-2 mb-30  text text_type_main-default text_color_inactive`}>
      Дождитесь готовности на орбитальной станции
    </p>
  </>
);

export default OrderDetails;
