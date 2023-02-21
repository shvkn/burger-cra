import styles from './burger-ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC } from 'react';
import { useDrag } from 'react-dnd';
import { DndItemTypes } from 'utils/constants';
import { Link, useLocation } from 'react-router-dom';
import { selectIngredientCountById } from 'services/selectors/burger';
import { TIngredient } from 'services/types/data';
import { useAppSelector } from 'services/slices';

type TBurgerIngredientProps = {
  ingredient: TIngredient;
};

const BurgerIngredient: FC<TBurgerIngredientProps> = ({ ingredient }) => {
  const id = ingredient._id;
  // TODO вынести в параметры
  const count = useAppSelector(selectIngredientCountById(id));
  const location = useLocation();
  const [, dragRef] = useDrag({
    type: DndItemTypes.BURGER_INGREDIENT,
    item: { id },
  });

  return (
    <Link
      to={{
        pathname: `/ingredient/${id}`,
        state: { background: location },
      }}
      className={styles.ingredient}
      ref={dragRef}
    >
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
    </Link>
  );
};

export default React.memo(BurgerIngredient);
