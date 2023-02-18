import React, { FC } from 'react';
import styles from './ingredients-category.module.css';
import BurgerIngredient from 'components/burger-ingredient';
import { TIngredient } from 'services/types/data';

type TIngredientsCategory = {
  readonly items: ReadonlyArray<TIngredient>;
  readonly title: string;
};

const IngredientsCategory: FC<TIngredientsCategory> = ({ items, title }) => (
  <>
    <h2 className='text text_type_main-medium'>{title}</h2>
    <div className='pt-6 pr-2 pb-10 pl-4'>
      <ul className={`${styles.ingredients}`}>
        {items.map((item) => (
          <li key={item._id}>
            <BurgerIngredient ingredient={item} />
          </li>
        ))}
      </ul>
    </div>
  </>
);

export default React.memo(IngredientsCategory);
