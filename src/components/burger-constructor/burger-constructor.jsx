import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { IngredientTypes, ItemTypes } from 'utils/constants';
import { actions as burgerActions } from 'services/slices/burger';
import {
  selectBurgerBun,
  selectBurgerIngredients,
  selectIsBurgerBunEmpty,
  selectIsBurgerIngredientsEmpty,
  selectOrderNumber,
  selectOrderSlice,
  selectTotalPrice,
} from 'utils/selectors';
import { useHistory } from 'react-router-dom';
import orderActions from 'services/actions/order';
import ingredientsSelectors from 'services/selectors/ingredients';
import authSelectors from 'services/selectors/auth';

function BurgerConstructor() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const orderSlice = useSelector(selectOrderSlice);
  const order = history.state?.order ?? orderSlice;
  const orderNumber = useSelector(selectOrderNumber);
  const ingredientsEntities = useSelector(ingredientsSelectors.selectEntities);
  const burgerIngredients = useSelector(selectBurgerIngredients);
  const totalPrice = useSelector(selectTotalPrice);

  const burgerBunId = useSelector(selectBurgerBun);
  const burgerBun = useSelector(ingredientsSelectors.selectById(burgerBunId));

  const isBunEmpty = useSelector(selectIsBurgerBunEmpty);
  const isIngredientsEmpty = useSelector(selectIsBurgerIngredientsEmpty);

  const isAuthorized = useSelector(authSelectors.isAuthorized);

  const isOrderValid = useMemo(
    () => !isBunEmpty && !isIngredientsEmpty,
    [isBunEmpty, isIngredientsEmpty]
  );

  const burgerBunName = burgerBun?.name;
  const burgerBunPrice = burgerBun?.price;
  const burgerBunImage = burgerBun?.image;

  const handleOnDrop = (id) => {
    const { type } = ingredientsEntities[id];
    if (type === IngredientTypes.BUN) {
      dispatch(burgerActions.setBun(id));
    } else {
      dispatch(burgerActions.addIngredient(id));
    }
  };

  const [, dropTarget] = useDrop({
    accept: ItemTypes.BURGER_INGREDIENT,
    drop: ({ id }) => {
      handleOnDrop(id);
    },
  });

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleRemove = (index) => dispatch(burgerActions.removeIngredient(index));

  const handleMakeOrder = () => {
    if (!isAuthorized) {
      history.push({
        pathname: '/login',
        state: { from: history.location },
      });
    } else {
      const burgerIngredientsIds = burgerIngredients.map(({ id }) => id);
      handleOpenModal();
      dispatch(orderActions.makeOrder([burgerBunId, ...burgerIngredientsIds]));
    }
  };
  const handleMove = (hoverIndex, dragIndex) => {
    dispatch(burgerActions.moveIngredient({ hoverIndex, dragIndex }));
  };

  return (
    <div className={`${styles.burgerConstructor}`} ref={dropTarget}>
      {showModal && (
        <Modal handleClose={handleCloseModal}>
          <Modal.Header />
          <Modal.Content>
            {order.isLoading && (
              <p className='mt-8 mb-30 text text_type_main-default'>Оформляем ваш заказ</p>
            )}
            {order.error && (
              <p className='mt-8 mb-30 text text_type_main-default'>
                Произошла ошибка и мы не смогли принять ваш заказ. Пожалуйста, повторите позже.
              </p>
            )}
            {!order.isLoading && !order.error && <OrderDetails number={orderNumber} />}
          </Modal.Content>
        </Modal>
      )}
      <div className={`ml-4 ${styles.container}`}>
        {!isBunEmpty && (
          <div className={`ml-8 ${styles.bun}`}>
            <ConstructorElement
              text={`${burgerBunName} (верх)`}
              thumbnail={burgerBunImage}
              price={burgerBunPrice}
              type='top'
              isLocked
            />
          </div>
        )}
        {!isOrderValid && (
          <div className={styles.message}>
            <p className={`mt-8 text text_type_main-medium text_color_inactive`}>
              {isIngredientsEmpty
                ? isBunEmpty
                  ? 'Пожалуйста, перетащите булку и ингредиенты'
                  : 'Добавьте ингредиенты'
                : 'Добавьте булку'}
            </p>
          </div>
        )}
        {!isIngredientsEmpty && (
          <ul className={`${styles.ingredients} mt-10 scroll`}>
            {burgerIngredients.map(({ id, uid }, index) => {
              const { image, price, name } = ingredientsEntities[id];
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
        {!isBunEmpty && (
          <div className={`ml-8 ${styles.bun}`}>
            <ConstructorElement
              text={`${burgerBunName} (низ)`}
              thumbnail={burgerBunImage}
              price={burgerBunPrice}
              type='bottom'
              isLocked
            />
          </div>
        )}
      </div>
      <div className={`pt-10 pb-10 pr-4 ${styles.panel}`}>
        <div className={`mr-10 ${styles.price}`}>
          <p className='mr-2 text text_type_digits-medium'>{totalPrice}</p>
          <CurrencyIcon type='primary' />
        </div>
        <Button
          type='primary'
          size='large'
          htmlType='button'
          onClick={handleMakeOrder}
          disabled={!isOrderValid}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

export default BurgerConstructor;
