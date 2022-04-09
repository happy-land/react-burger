import styles from './burger-constructor.module.css';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
// import { data } from '../../utils/data';

export const BurgerConstructor = ({ data, setIsOrderDetailsOpened }) => {
  return (
    <div className={`${styles.container} pt-25 pr-4 pl-4`}>
      <div>
        <ConstructorElement
          className={styles.bunElement}
          type='top'
          isLocked={true}
          text='Краторная булка N-200i (верх)'
          price={200}
          thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
        />
      </div>

      <div className={styles.innerIngredients}>
        {data
          .filter((item) => item.type !== 'bun')
          .map((item, index) => (
            <div key={index} className={styles.elementContainer}>
              <DragIcon />
              <ConstructorElement
                key={item._id}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          ))}
      </div>
      <div>
        <ConstructorElement
          type='bottom'
          isLocked={true}
          text='Краторная булка N-200i (низ)'
          price={200}
          thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
        />
      </div>
      <div className={`${styles.info} mt-10 pr-7`}>
        <div className={`${styles.totalContainer} mr-10`}>
          <p className='text text_type_digits-medium mr-2'>610</p>
          <CurrencyIcon type='primary'/>
        </div>
        <Button onClick={() => setIsOrderDetailsOpened(true)}>Оформить заказ</Button>
      </div>
    </div>
  );
};
