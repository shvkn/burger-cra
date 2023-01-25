import styles from './burger-ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { ingredientPropTypes } from 'utils/prop-types';
import { useDrag } from 'react-dnd';
import { ItemTypes } from 'utils/constants';
import { useSelector } from 'react-redux';
import { selectIngredientCountById } from 'utils/selectors';
import { Link, useLocation } from 'react-router-dom';

function BurgerIngredient({ ingredient }) {
  const id = ingredient._id;
  const count = useSelector(selectIngredientCountById(id));
  const location = useLocation();
  const [, dragRef] = useDrag({
    type: ItemTypes.BURGER_INGREDIENT,
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
}

BurgerIngredient.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
};

export default React.memo(BurgerIngredient);
