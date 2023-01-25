import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from 'utils/constants';
import { useDrag, useDrop } from 'react-dnd';

function SortableElement({ children, index, handleMove }) {
  const ref = useRef();
  const [{ isDragging }, dragRef] = useDrag({
    type: ItemTypes.SORTABLE_ITEM,
    item: { index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const [, dropRef] = useDrop({
    accept: ItemTypes.SORTABLE_ITEM,
    hover: (item, monitor) => {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverClientY = monitor.getClientOffset().y - hoverBoundingRect.top;

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;

      handleMove(hoverIndex, dragIndex);
      item.index = index;
    },
  });
  dropRef(dragRef(ref));
  const opacity = isDragging ? 0 : 1;
  return (
    <div ref={ref} style={{ opacity }}>
      {children}
    </div>
  );
}

SortableElement.propTypes = {
  children: PropTypes.node.isRequired,
  handleMove: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default SortableElement;
