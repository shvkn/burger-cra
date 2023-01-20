import React from 'react';
import IngredientDetails from 'components/ingredient-details';
import { ingredientPropTypes } from 'utils/prop-types';
import DetailsLayout from 'components/details-layout';
import styles from './ingredient.module.css';

function IngredientPage({ ingredient }) {
  return (
    <main className={styles.layout}>
      <DetailsLayout>
        <DetailsLayout.Header>
          <p className={'text text_type_main-large'}>Детали ингредиента</p>
        </DetailsLayout.Header>
        <DetailsLayout.Content>
          <IngredientDetails ingredient={ingredient} />
        </DetailsLayout.Content>
      </DetailsLayout>
    </main>
  );
}

IngredientPage.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
};

export default IngredientPage;
