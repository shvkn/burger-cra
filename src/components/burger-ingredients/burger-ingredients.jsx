import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { useSelector } from 'react-redux';
import { IngredientTypes } from 'utils/constants';
import IngredientsCategory from 'components/ingredients-category';
import ingredientsSelectors from 'services/selectors/ingredients';

const typeBun = IngredientTypes.BUN;
const typeSauce = IngredientTypes.SAUCE;
const typeMain = IngredientTypes.MAIN;

function BurgerIngredients() {
  const [activeTab, setActiveTab] = useState(typeBun);
  const ingredients = useSelector(ingredientsSelectors.selectAll);

  const ingredientsTypeBun = useMemo(
    () => ingredients.filter(({ type }) => type === typeBun),
    [ingredients]
  );
  const ingredientsTypeSauce = useMemo(
    () => ingredients.filter(({ type }) => type === typeSauce),
    [ingredients]
  );
  const ingredientsTypeMain = useMemo(
    () => ingredients.filter(({ type }) => type === typeMain),
    [ingredients]
  );

  const categoriesRootRef = useRef();
  const categoriesRefs = {
    [typeBun]: useRef(),
    [typeMain]: useRef(),
    [typeSauce]: useRef(),
  };

  useEffect(() => {
    const createTabObserver = () => {
      return new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const tabValue = entry.target.dataset.tab;
              if (tabValue === activeTab) return;
              setActiveTab(tabValue);
            }
          }),
        {
          root: categoriesRootRef.current,
          rootMargin: '-50% 0px',
        }
      );
    };
    const observer = createTabObserver();
    Object.values(categoriesRefs).forEach((ref) => observer.observe(ref.current));
  }, [categoriesRefs, activeTab]);

  const handleTabClick = (type) => {
    setActiveTab(type);
    categoriesRefs[type].current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.burgerIngredients}>
      <h1 className='mt-10 mb-5 heading text text_type_main-large'>Соберите бургер</h1>
      <div className='mb-10'>
        <ul className={`${styles.tabs}`}>
          <>
            <li key={typeBun}>
              <Tab active={activeTab === typeBun} value={typeBun} onClick={handleTabClick}>
                Булки
              </Tab>
            </li>
            <li key={typeSauce}>
              <Tab active={activeTab === typeSauce} value={typeSauce} onClick={handleTabClick}>
                Соусы
              </Tab>
            </li>
            <li key={typeMain}>
              <Tab active={activeTab === typeMain} value={typeMain} onClick={handleTabClick}>
                Начинки
              </Tab>
            </li>
          </>
        </ul>
      </div>
      <ul className={`${styles.categories} scroll`} ref={categoriesRootRef}>
        <li key={typeBun} ref={categoriesRefs[typeBun]} data-tab={typeBun}>
          <IngredientsCategory title={'Булки'} items={ingredientsTypeBun} />
        </li>
        <li key={typeSauce} ref={categoriesRefs[typeSauce]} data-tab={typeSauce}>
          <IngredientsCategory title={'Соусы'} items={ingredientsTypeSauce} />
        </li>
        <li key={typeMain} ref={categoriesRefs[typeMain]} data-tab={typeMain}>
          <IngredientsCategory title={'Начинки'} items={ingredientsTypeMain} />
        </li>
      </ul>
    </section>
  );
}

export default BurgerIngredients;
