import React from 'react';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { ingredientPropTypes } from '../../utils/prop-types';
import Details from '../../layouts/details/details';

function IngredientPage({ ingredient }) {
  return (
    <Details>
      <Details.Header>
        <p className={'text text_type_main-large'}>Детали ингредиента</p>
      </Details.Header>
      <Details.Content>
        <IngredientDetails ingredient={ingredient} />
      </Details.Content>
    </Details>
  );
}

IngredientPage.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
};

export default IngredientPage;
