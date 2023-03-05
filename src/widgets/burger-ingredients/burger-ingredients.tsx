import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useRef, useState } from 'react';

import { DragToConstructor } from 'features/add-ingredient';
import { ModalRoute } from 'features/modal-route';

import { burgerModel } from 'entities/burger';
import { BurgerIngredient } from 'entities/ingredient';

import { useIntersectionObserver } from 'shared/lib';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  groups: [string, TIngredient[]][];
};

export const BurgerIngredients: React.FC<TBurgerIngredientsProps> = ({ groups }) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const groupsRootRef = useRef<HTMLDivElement | null>(null);
  const counts = burgerModel.useBurgerCounts();
  const {
    register,
    current: visibleType,
    elementsRefs: groupsRefs,
  } = useIntersectionObserver<string>({
    root: groupsRootRef.current,
    rootMargin: '-50% 0px',
  });

  useEffect(() => {
    setActiveTab(visibleType);
  }, [visibleType]);

  const handleTabClick = (value: string): void => {
    setActiveTab(value);
    groupsRefs[value]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.burgerIngredients}>
      <h1 className='mt-10 mb-5 heading text text_type_main-large'>Соберите бургер</h1>
      <div className='mb-10'>
        <ul className={`${styles.tabs}`}>
          {groups.map(([title], idx) => (
            <li key={idx}>
              <Tab active={activeTab === `${idx}`} value={`${idx}`} onClick={handleTabClick}>
                {title}
              </Tab>
            </li>
          ))}
        </ul>
      </div>
      <ul className={`${styles.categories} scroll`}>
        {groups.map(([title, ingredients], idx) => (
          <li key={idx} {...register(`${idx}`)}>
            <h2 className='text text_type_main-medium'>{title}</h2>
            <div className='pt-6 pr-2 pb-10 pl-4'>
              <ul className={`${styles.ingredients}`}>
                {ingredients.map((ingredient) => (
                  <li key={ingredient._id}>
                    <ModalRoute path={`/ingredient/${ingredient._id}`}>
                      <DragToConstructor ingredient={ingredient}>
                        <BurgerIngredient ingredient={ingredient} count={counts(ingredient._id)} />
                      </DragToConstructor>
                    </ModalRoute>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
