import styles from 'entities/ingredient/ui/burger-ingredient/burger-ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';

type TBurgerIngredientProps = {
  count: number;
  ingredient: TIngredient;
};

export const BurgerIngredient: React.FC<TBurgerIngredientProps> = ({ ingredient, count }) => {
  return (
    <div className={styles.ingredient}>
      {count > 0 && <Counter count={count} size='default' />}
      <img
        className={`ml-4 mr-4 mb-2 ${styles.ingredientImage}`}
        src={ingredient.image}
        alt={ingredient.name}
      />
      <div className={`${styles.ingredientPrice}`}>
        <p className='mr-2 text text_type_digits-default'>{ingredient.price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <h3 className='mt-2 text text_type_main-default'>{ingredient.name}</h3>
    </div>
  );
};
