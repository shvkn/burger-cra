import React, { FC } from 'react';
import styles from './ingredient-details.module.css';
import { TIngredient } from 'services/types/data';

type TIngredientDetails = {
  ingredient: TIngredient;
};

const IngredientDetails: FC<TIngredientDetails> = ({ ingredient }) => (
  <article className={styles.container}>
    <img className={styles.image} src={ingredient.image_large} alt={ingredient.name} />
    <p className={`mt-4 mb-8 text text_type_main-medium ${styles.name}`}>{ingredient.name}</p>
    <ul className={`mb-15 text text_type_main-default text_color_inactive ${styles.facts}`}>
      <li className={`${styles.fact}`}>
        Калории,ккал
        <span className='mt-2 text text_type_digits-default'>{ingredient.calories}</span>
      </li>
      <li className={`ml-5 ${styles.fact}`}>
        Белки, г<span className='mt-2 text text_type_digits-default'>{ingredient.proteins}</span>
      </li>
      <li className={`ml-5 ${styles.fact}`}>
        Жиры, г<span className='mt-2 text text_type_digits-default'>{ingredient.fat}</span>
      </li>
      <li className={`ml-5 ${styles.fact}`}>
        Углеводы, г
        <span className='mt-2 text text_type_digits-default'>{ingredient.carbohydrates}</span>
      </li>
    </ul>
  </article>
);

export default IngredientDetails;
