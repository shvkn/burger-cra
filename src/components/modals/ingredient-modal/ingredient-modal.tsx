import React, { FC } from 'react';
import Modal from 'components/modal';
import IngredientDetails from 'components/ingredient-details';
import { useHistory, useParams } from 'react-router-dom';
import { ingredientModel } from 'entities/ingredient';

const IngredientModal: FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const ingredient = ingredientModel.useIngredient(id);

  const handleClose = () => {
    history.goBack();
  };

  return ingredient ? (
    <Modal handleClose={handleClose}>
      <Modal.Header handleClose={handleClose}>
        <p className={'text text_type_main-large'}>Детали ингредиента</p>
      </Modal.Header>
      <Modal.Content>
        <IngredientDetails ingredient={ingredient} />
      </Modal.Content>
    </Modal>
  ) : null;
};

export default IngredientModal;
