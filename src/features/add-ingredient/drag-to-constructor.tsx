import React from 'react';
import { useDrag } from 'react-dnd';
import { DndItemTypes } from 'shared/config';

type TDragToConstructorProps = {
  ingredient: TIngredient;
  children: React.ReactNode;
};

export const DragToConstructor: React.FC<TDragToConstructorProps> = ({ ingredient, children }) => {
  const [, dragRef] = useDrag({
    type: DndItemTypes.BURGER_INGREDIENT,
    item: { id: ingredient._id },
  });
  return <div ref={dragRef}>{children}</div>;
};
