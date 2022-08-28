import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './order-card.module.css';

// const getIngredientImage = (ingredientImage) => {
//   return {
//     backgroundImage: `url( ${ingredientImage} )`,
//   };
// };

const getIngredientImage = (ingredientImage) => {
  return `url( ${ingredientImage} )`;
};

export const OrderCard = ({ order }) => {
  const { items } = useSelector((store) => store.ingredients);

  const [orderTotalPrice, setOrderTotalPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesToShow, setImagesToShow] = useState([]);
  const [remainCounter, setRemainCounter] = useState(null);

  const maxIngredients = 6;

  const getPrice = (id) => {
    const ingredient = items.find((ingredient) => ingredient._id === id);

    if (!ingredient) {
      return 0;
    }
    // console.log(ingredients);
    if (ingredient.type === 'bun') {
      return ingredient.price * 2;
    }
    return ingredient.price;
  };

  const getImage = (id) => {
    const ingredient = items.find((ingredient) => ingredient._id === id);

    if (!ingredient) {
      return 0;
    }
    return ingredient.image_mobile;
  };

  useEffect(() => {
    if (items.length !== 0) {
      let sum = 0;
      setImages([]);
      let imagesArr = [];
      order.ingredients.forEach((id) => {
        sum += getPrice(id);
        imagesArr.push(getImage(id));
      });
      // console.log(`#${order.number} ${order.ingredients} sum=${sum}`);
      setOrderTotalPrice(sum);
      setImages(imagesArr);
      setImagesToShow(imagesArr.slice(0, maxIngredients));
      if (imagesArr.length > maxIngredients) {
        setRemainCounter(imagesArr.length - maxIngredients);
      } else {
        setRemainCounter(null);
      }
    }
  }, [items]);

  return (
    <article className={styles.card}>
      <div className={styles.orderId}>
        <p className={`text text_type_digits-default`}>#{order.number}</p>
        <p className={styles.timestamp}>{order.createdAt}</p>
      </div>
      <h2 className={styles.title}>{order.name}</h2>
      <div className={styles.components}>
        <div className={styles.imagesWrapper}>
          {imagesToShow.map((image, index) => {
            return (
              <div
                key={index}
                className={`${styles.imageWrapper} ${styles.imageWrapper1}`}
              >
                {/* <div
                  className={styles.image}
                  style={{
                    opacity: maxIngredients === index + 1 ? 0.6 : 1,
                    backgroundImage: getIngredientImage(image),
                  }}
                >
                </div> */}
                <img 
                className={styles.image}
                src={image}
                alt='123'/>
                {maxIngredients === index + 1 ? (
                    <span className={styles.counter}>+{remainCounter}</span>
                  ) : null}
              </div>
            );
          })}
        </div>
        <div className={styles.priceWrapper}>
          <p className='text text_type_digits-default'>{orderTotalPrice}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </article>
  );
};
