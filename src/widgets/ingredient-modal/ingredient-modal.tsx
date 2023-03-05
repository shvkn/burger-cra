import React from 'react';
import { Modal } from 'shared/ui';
import { IngredientDetails } from 'entities/ingredient/ui';
import { useHistory, useParams } from 'react-router-dom';
import { ingredientModel } from 'entities/ingredient';

export const IngredientModal: React.FC = () => {
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
