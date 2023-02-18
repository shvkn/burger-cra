import React, { RefObject, useEffect, useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import IngredientsCategory from 'components/ingredients-category';
import ingredientsSelectors from 'services/selectors/ingredients';
import { TIngredient, TIngredientType } from 'services/types/data';
import { useAppSelector } from 'services/slices';
import useIntersectionObserver, { TEntityEqualComparer } from 'hooks/use-intersection-observer';
import { groupBy } from 'utils/utils';

const categories: Array<{ type: TIngredientType; title: string }> = [
  { type: 'bun', title: 'Булки' },
  { type: 'sauce', title: 'Соусы' },
  { type: 'main', title: 'Начинки' },
];

const entryEqualComparer: TEntityEqualComparer = (a, b) => {
  return a.target.id === b.target.id;
};

function BurgerIngredients() {
  const [activeTab, setActiveTab] = useState<TIngredientType>(categories[0].type);
  const ingredients = useAppSelector(ingredientsSelectors.selectAll);
  const ingredientsByType: Record<TIngredientType, TIngredient[]> = groupBy(
    ingredients,
    (i) => i.type
  );

  const categoriesRootRef = useRef<HTMLUListElement>(null);
  const categoriesRefs: Record<TIngredientType, RefObject<HTMLLIElement>> = {
    bun: useRef<HTMLLIElement>(null),
    main: useRef<HTMLLIElement>(null),
    sauce: useRef<HTMLLIElement>(null),
  };

  const intersectingEntry = useIntersectionObserver(
    Object.values(categoriesRefs),
    entryEqualComparer,
    {
      root: categoriesRootRef.current,
      rootMargin: '-50% 0px',
    }
  );

  useEffect(() => {
    switch (intersectingEntry?.target.id) {
      case 'bun':
        setActiveTab('bun');
        break;
      case 'sauce':
        setActiveTab('sauce');
        break;
      case 'main':
        setActiveTab('main');
        break;
    }
  }, [intersectingEntry]);

  const handleTabClick = (value: string): void => {
    const type = value as TIngredientType;
    setActiveTab(type);
    categoriesRefs[type]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.burgerIngredients}>
      <h1 className='mt-10 mb-5 heading text text_type_main-large'>Соберите бургер</h1>
      <div className='mb-10'>
        <ul className={`${styles.tabs}`}>
          {categories.map(({ type, title }) => (
            <li key={type}>
              <Tab active={activeTab === type} value={type} onClick={handleTabClick}>
                {title}
              </Tab>
            </li>
          ))}
        </ul>
      </div>
      <ul className={`${styles.categories} scroll`} ref={categoriesRootRef}>
        {categories.map(({ type, title }) => (
          <li key={type} id={type} ref={categoriesRefs[type]}>
            <IngredientsCategory title={title} items={ingredientsByType[type]} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default BurgerIngredients;
