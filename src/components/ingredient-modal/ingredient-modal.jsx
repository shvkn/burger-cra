import React from 'react';
import Modal from 'components/modal';
import IngredientDetails from 'components/ingredient-details';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ingredientsSelectors from 'services/selectors/ingredients';

function IngredientModal() {
  const { id } = useParams();
  const entities = useSelector(ingredientsSelectors.selectEntities);
  const ingredient = entities[id];
  const history = useHistory();
  const handleClose = () => {
    history.goBack();
  };

  return (
    <Modal handleClose={handleClose}>
      <Modal.Header>
        <p className={'text text_type_main-large'}>Детали ингредиента</p>
      </Modal.Header>
      <Modal.Content>
        <IngredientDetails ingredient={ingredient} />
      </Modal.Content>
    </Modal>
  );
}

export default IngredientModal;
