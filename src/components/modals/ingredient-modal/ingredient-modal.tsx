import React from 'react';
import Modal from 'components/modal';
import IngredientDetails from 'components/ingredient-details';
import { useHistory, useParams } from 'react-router-dom';
import ingredientsSelectors from 'services/selectors/ingredients';
import { useAppSelector } from 'services/slices';

const IngredientModal = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const ingredient = useAppSelector(ingredientsSelectors.selectById(id));

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
