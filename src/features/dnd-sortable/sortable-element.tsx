import React, { FC, ReactNode, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DndItemTypes } from 'shared/config';

type TSortableElementProps = {
  children: ReactNode;
  index: number;
  handleMove: (hoverIndex: number, dragIndex: number) => void;
};

export const SortableElement: FC<TSortableElementProps> = ({ children, index, handleMove }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, dragRef] = useDrag({
    type: DndItemTypes.SORTABLE_ITEM,
    item: { index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const [, dropRef] = useDrop({
    accept: DndItemTypes.SORTABLE_ITEM,
    hover: (item: TDndSortableItem, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const dragIndex = item.index;
      const hoverIndex = index;
      if (!ref.current || clientOffset === null || dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      const isDragAboveDrop = dragIndex < hoverIndex && hoverClientY < hoverMiddleY;
      const isDragBelowDrop = dragIndex > hoverIndex && hoverClientY > hoverMiddleY;
      if (isDragAboveDrop || isDragBelowDrop) {
        return;
      }
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
};
