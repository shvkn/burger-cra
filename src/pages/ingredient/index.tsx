import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { IngredientDetails, ingredientModel } from 'entities/ingredient';

import { DetailsLayout } from 'shared/ui';

import styles from './styles.module.css';

export const IngredientPage: FC = () => {
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
