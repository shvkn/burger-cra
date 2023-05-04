import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { IngredientDetails, ingredientModel } from 'entities/ingredient';

import { Modal } from 'shared/ui';

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
