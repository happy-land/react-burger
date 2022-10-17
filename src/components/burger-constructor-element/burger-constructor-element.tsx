import { FC, useRef } from 'react';
import { useDrop, useDrag, XYCoord } from 'react-dnd';
import styles from './burger-constructor-element.module.css';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from '../../hooks/hooks';
import { CONSTRUCTOR_REORDER } from '../../services/constants'; 
import { TIngredient } from '../../services/types/data';

interface IBurgerConstructorElement {
  item: TIngredient;
  index: number;
  handleClose: (item: TIngredient) => void;
}

export const BurgerConstructorElement: FC<IBurgerConstructorElement> = ({ item, index, handleClose }) => {
  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ['SORT_INGREDIENT'],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: { index: number }, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect: DOMRect | undefined = ref.current?.getBoundingClientRect();
      const hoverMiddleY: number = ((hoverBoundingRect as DOMRect).bottom - (hoverBoundingRect as DOMRect).top) / 2;
      const clientOffset: XYCoord | null = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - (hoverBoundingRect as DOMRect).top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch({
        type: CONSTRUCTOR_REORDER,
        // type: CONSTRUCTOR_SORT,
        payload: {
          from: dragIndex,
          to: hoverIndex
        }
      });
      item.index = hoverIndex;
    }
  })

  // логика перетаскивания ингредиентов внутри заказа (вверх и вниз).
  const [{ isDragging }, drag] = useDrag({
    type: 'SORT_INGREDIENT',
    item: () => {
      return { item, index };  // ingredient -> item
    },
    // item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      className={styles.elementContainer}
      style={{ opacity }}
      data-handler-id={handlerId}
      ref={ref}>
        <DragIcon type={'secondary'} />
        <ConstructorElement
          text={item.name}
          price={item.price}
          thumbnail={item.image}
          handleClose={() => handleClose(item)}
        />
    </div>
  );
};
