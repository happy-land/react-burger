import { useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import styles from './burger-constructor-element.module.css';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
// import { CONSTRUCTOR_REORDER } from '../../services/actions/burger';
import { CONSTRUCTOR_REORDER } from '../../services/constants'; 


export const BurgerConstructorElement = ({ item, index, handleClose }) => {
  const dispatch = useDispatch();

  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ['SORT_INGREDIENT'],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
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
        <DragIcon />
        <ConstructorElement
          text={item.name}
          price={item.price}
          thumbnail={item.image}
          handleClose={() => handleClose(item)}
        />
    </div>
  );
};
