import React from 'react';
import { useSelector } from 'react-redux';
import styles from './constructor.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from 'components/burger-ingredients';
import BurgerConstructor from 'components/burger-constructor';
import ingredientsSelectors from 'services/selectors/ingredients';

function ConstructorPage() {
  const isIngredientsSucceeded = useSelector(ingredientsSelectors.selectIsSucceeded);
  const isIngredientsFailed = useSelector(ingredientsSelectors.selectIsFailed);
  const isIngredientsLoading = useSelector(ingredientsSelectors.selectIsLoading);
  return (
    <main className={styles.layout}>
      {(isIngredientsLoading || isIngredientsFailed) && (
        <p className={`text text_type_main-large text_color_inactive ${styles.message}`}>
          {isIngredientsLoading
            ? 'Загрузка данных'
            : isIngredientsFailed
            ? 'Ошибка загрузки данных'
            : ''}
        </p>
      )}
      {isIngredientsSucceeded && (
        <>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <div className='ml-10 pt-25'>
              <BurgerConstructor />
            </div>
          </DndProvider>
        </>
      )}
    </main>
  );
}

export default ConstructorPage;
