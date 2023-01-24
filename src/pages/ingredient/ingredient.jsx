import React from 'react';
import IngredientDetails from 'components/ingredient-details';
import DetailsLayout from 'components/details-layout';
import styles from './ingredient.module.css';
import { useSelector } from 'react-redux';
import ingredientsSelectors from 'services/selectors/ingredients';
import { useParams } from 'react-router-dom';

function IngredientPage() {
  const { id } = useParams();
  const entities = useSelector(ingredientsSelectors.selectEntities);
  const ingredient = entities[id];
  return ingredient ? (
    <main className={`mt-30 ${styles.layout}`}>
      <DetailsLayout>
        <DetailsLayout.Header>
          <p className={'text text_type_main-large'}>Детали ингредиента</p>
        </DetailsLayout.Header>
        <DetailsLayout.Content>
          <IngredientDetails ingredient={ingredient} />
        </DetailsLayout.Content>
      </DetailsLayout>
    </main>
  ) : null;
}

export default IngredientPage;
