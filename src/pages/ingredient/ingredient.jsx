import React from 'react';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import styles from '../page.module.css';
import { ingredientPropTypes } from '../../utils/prop-types';
function IngredientPage({ ingredient }) {
  return (
    <div className={`${styles.container}`}>
      <IngredientDetails ingredient={ingredient} />
    </div>
  );
}

IngredientPage.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
};

export default IngredientPage;
