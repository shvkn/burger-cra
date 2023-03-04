import React, { FC } from 'react';
import styles from './constructor.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from 'components/burger-ingredients';
import BurgerConstructor from 'components/burger-constructor';
import LoadingCurtain from 'components/loading-curtain/loading-curtain';
import { ingredientModel } from 'entities/ingredient';

const ConstructorPage: FC = () => {
  const {
    isSucceeded: isIngredientsSucceeded,
    isLoading: isIngredientsLoading,
    isFailed: isIngredientsFailed,
  } = ingredientModel.useIngredients();
  return (
    <main className={styles.layout}>
      {isIngredientsLoading && <LoadingCurtain />}
      {isIngredientsFailed && (
        <p className={`text text_type_main-large text_color_inactive ${styles.message}`}>
          Ошибка загрузки данных
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
};

export default ConstructorPage;
