import React, { FC } from 'react';
import IngredientDetails from 'components/ingredient-details';
import DetailsLayout from 'components/details-layout';
import styles from './ingredient.module.css';
import ingredientsSelectors from 'services/selectors/ingredients';
import { useParams } from 'react-router-dom';
import { NotFoundedPage } from 'pages/index';
import { useAppSelector } from 'services/slices';

const IngredientPage: FC = () => {
  const { id } = useParams<{ id: TIngredientId }>();
  const ingredient = useAppSelector(ingredientsSelectors.selectById(id));
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
  ) : (
    <NotFoundedPage />
  );
};

export default IngredientPage;
