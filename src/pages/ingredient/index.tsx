import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { IngredientDetails, ingredientModel } from 'entities/ingredient';

import { useAppDispatch } from 'shared/lib';
import { DetailsLayout } from 'shared/ui';

import styles from './styles.module.css';

const IngredientPage: FC = () => {
  const { id } = useParams<{ id: TIngredientId }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(ingredientModel.actions.getIngredientsAsync());
    return () => {
      promise.abort();
    };
  });

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
