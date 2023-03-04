import React, { FC, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import styles from './burger-constructor.module.css';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from 'components/modal/modal';
import OrderDetails from 'components/order-details';
import SortableElement from 'components/sortable-element';
import { DndItemTypes, Messages } from 'utils/constants';
import * as burgerActions from 'services/actions/burger';
import * as orderActions from 'services/actions/order';
import burgerSelectors from 'services/selectors/burger';
import { useAppDispatch, useAppHistory, useAppSelector } from 'services/slices';
import orderSelectors from 'services/selectors/order';
import { ingredientModel } from 'entities/ingredient';

type TDnDIngredientItem = { id: TIngredientId };

const BurgerConstructor: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const history = useAppHistory();

  useEffect(() => {
    const burgerFromHistory = history.location.state?.burger;
    if (burgerFromHistory) {
      dispatch(burgerActions.setState(burgerFromHistory));
    }
  }, [dispatch, history.location.state?.burger]);

  const { entities: ingredientsEntities } = ingredientModel.useIngredients();
  const burgerSlice = useAppSelector(burgerSelectors.selectBurgerSlice);

  const orderNumber = useAppSelector(orderSelectors.selectOrderNumber);

  const burgerBun = useAppSelector(burgerSelectors.selectBunIngredient);
  const burgerIngredients = useAppSelector(burgerSelectors.selectIngredients);
  const burgerTotalPrice = useAppSelector(burgerSelectors.selectTotalPrice);

  const isOrderLoading = useAppSelector(orderSelectors.selectIsOrderLoading);

  const isOrderError = useAppSelector(orderSelectors.selectIsOrderFailed);

  const [, dropTarget] = useDrop({
    accept: DndItemTypes.BURGER_INGREDIENT,
    drop: (item: TDnDIngredientItem): void => {
      const id = item.id;
      const ingredient = ingredientsEntities[id];
      if (ingredient === undefined) {
        return;
      }
      if (ingredient.type === 'bun') {
        dispatch(burgerActions.setBun(id));
      } else {
        dispatch(burgerActions.addIngredient(id));
      }
    },
  });

  const handleOpenModal = (): void => {
    setShowModal(true);
  };

  const handleCloseModal = (): void => {
    setShowModal(false);
  };

  const handleRemove = (index: number): void => {
    dispatch(burgerActions.removeIngredient(index));
  };

  const handleMove = (hoverIndex: number, dragIndex: number): void => {
    dispatch(burgerActions.moveIngredient(hoverIndex, dragIndex));
  };
  const isBunSelected = !!burgerBun;
  const isIngredientsSelected = !!burgerIngredients.length;

  const isOrderValid = isBunSelected && isIngredientsSelected;

  const makeOrder = (): void => {
    if (!isOrderValid) {
      return;
    }
    const ingredientsIds = burgerIngredients?.map(({ data }) => data._id);
    const bunId = burgerBun._id;
    handleOpenModal();
    const orderIds = [bunId, ...ingredientsIds, bunId];
    dispatch(orderActions.makeOrder(orderIds))
      .unwrap()
      .then(({ message, success }) => {
        if (success) {
          dispatch(burgerActions.reset());
          history.replace({
            ...history.location,
            state: {},
          });
        } else if (message === Messages.INVALID_TOKEN) {
          history.push({
            pathname: '/login',
            state: {
              from: { ...history.location, state: { burger: burgerSlice } },
            },
          });
        }
      });
  };

  return (
    <div className={`${styles.burgerConstructor}`} ref={dropTarget}>
      {showModal && (
        <Modal handleClose={handleCloseModal}>
          <Modal.Header handleClose={handleCloseModal} />
          <Modal.Content>
            {isOrderLoading && (
              <p className='mt-30 mb-30 ml-10 mr-10 text text_type_main-default'>
                Оформляем ваш заказ.
              </p>
            )}
            {isOrderError && (
              <p className='mt-30 mb-30 ml-10 mr-10 text text_type_main-default'>
                Произошла ошибка и мы не смогли принять ваш заказ. Пожалуйста, повторите позже.
              </p>
            )}
            {!isOrderLoading && !isOrderError && orderNumber && (
              <OrderDetails number={orderNumber} />
            )}
          </Modal.Content>
        </Modal>
      )}
      <div className={`ml-4 ${styles.container}`}>
        {isBunSelected && (
          <div className={`ml-8 ${styles.bun}`}>
            <ConstructorElement
              text={`${burgerBun.name} (верх)`}
              thumbnail={burgerBun.image}
              price={burgerBun.price}
              type='top'
              isLocked
            />
          </div>
        )}
        {!isOrderValid && (
          <div className={styles.message}>
            <p className={`mt-8 text text_type_main-medium text_color_inactive`}>
              {!isIngredientsSelected
                ? !isBunSelected
                  ? 'Пожалуйста, перетащите булку и ингредиенты'
                  : 'Добавьте ингредиенты'
                : 'Добавьте булку'}
            </p>
          </div>
        )}
        {isIngredientsSelected && (
          <ul className={`${styles.ingredients} mt-10 scroll`}>
            {burgerIngredients.map(({ id, uid, data }, index) => {
              const { image, price, name } = data;
              return (
                <li key={uid} className={`mt-4 mb-4`}>
                  <SortableElement index={index} handleMove={handleMove}>
                    <div className={styles.ingredient}>
                      <DragIcon type='primary' />
                      <ConstructorElement
                        text={name}
                        thumbnail={image}
                        price={price}
                        handleClose={() => handleRemove(index)}
                      />
                    </div>
                  </SortableElement>
                </li>
              );
            })}
          </ul>
        )}
        {isBunSelected && (
          <div className={`ml-8 ${styles.bun}`}>
            <ConstructorElement
              text={`${burgerBun.name} (низ)`}
              thumbnail={burgerBun.image}
              price={burgerBun.price}
              type='bottom'
              isLocked
            />
          </div>
        )}
      </div>
      <div className={`pt-10 pb-10 pr-4 ${styles.panel}`}>
        <div className={`mr-10 ${styles.price}`}>
          <p className='mr-2 text text_type_digits-medium'>{burgerTotalPrice}</p>
          <CurrencyIcon type='primary' />
        </div>
        <Button
          type='primary'
          size='large'
          htmlType='button'
          onClick={makeOrder}
          disabled={!isOrderValid}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};
export default BurgerConstructor;
