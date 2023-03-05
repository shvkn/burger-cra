import React, { FC } from 'react';
import { IngredientDetails } from 'entities/ingredient/ui';
import { DetailsLayout } from 'shared/ui';
import styles from './ingredient.module.css';
import { useParams } from 'react-router-dom';
import { ingredientModel } from 'entities/ingredient';

const IngredientPage: FC = () => {
  const { id } = useParams<{ id: TIngredientId }>();
  const ingredient = ingredientModel.useIngredient(id);
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
};

export default IngredientPage;
