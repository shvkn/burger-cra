import React, { useEffect } from 'react';
import styles from './constructor.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BurgerIngredients } from 'widgets/burger-ingredients';
import { BurgerConstructor } from 'widgets/burger-constructor';
import { LoadingCurtain } from 'shared/ui';
import { ingredientModel } from 'entities/ingredient';
import { groupBy, useAppDispatch } from 'shared/lib';

const groupByType = (ingredients: TIngredient[]) => groupBy(ingredients, ({ type }) => type);

const ConstructorPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ingredientModel.actions.getIngredientsAsync());
  }, [dispatch]);

  const {
    isSucceeded: isIngredientsSucceeded,
    isLoading: isIngredientsLoading,
    isFailed: isIngredientsFailed,
    ingredients,
  } = ingredientModel.useIngredients();

  const groups: [string, TIngredient[]][] = React.useMemo(() => {
    const groupedByType = groupByType(ingredients);
    return [
      ['Булки', groupedByType['bun']],
      ['Соусы', groupedByType['sauce']],
      ['Начинки', groupedByType['main']],
    ];
  }, [ingredients]);

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
            <BurgerIngredients groups={groups} />
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
