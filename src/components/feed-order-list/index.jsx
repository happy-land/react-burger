import styles from './feed-order-list.module.css';
import bun from '../../images/bun-01.png';
import meat03 from '../../images/meat-03.png';
import core from '../../images/core.png';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const getIngredientImage = (ingredientImage) => {
  return {
    backgroundImage: `url( ${ingredientImage} )`,
  };
};

export const FeedOrderList = () => {
  return (
    <div className={styles.container}>
      <article className={styles.card}>
        <div className={styles.orderId}>
          <p className={`text text_type_digits-default`}>#034535</p>
          <p className={styles.timestamp}>Сегодня, 16:20 i-GMT+3</p>
        </div>
        <h2 className={styles.title}>Death Star Starship Main бургер</h2>
        <div className={styles.components}>
          <div className={styles.imagesWrapper}>
            <div className={`${styles.imageWrapper} ${styles.imageWrapper1}`}>
              <div className={styles.image} style={getIngredientImage(bun)}></div>
            </div>
            <div className={`${styles.imageWrapper} ${styles.imageWrapper2}`}>
              <div className={styles.image} style={getIngredientImage(meat03)}></div>
            </div>
            <div className={`${styles.imageWrapper} ${styles.imageWrapper3}`}>
              <div className={styles.image} style={getIngredientImage(core)}></div>
            </div>
          </div>
          <div className={styles.priceWrapper}>
            <p className='text text_type_digits-default'>480</p>
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </article>
      <article className={styles.card}>
        <div className={styles.orderId}>
          <p className={`text text_type_digits-default`}>#034534</p>
          <p className={styles.timestamp}>Сегодня, 16:20 i-GMT+3</p>
        </div>
        <h2 className={styles.title}>Interstellar бургер</h2>
        <div className={styles.components}>
          <div className={styles.imagesWrapper}>
            <div className={`${styles.imageWrapper} ${styles.imageWrapper1}`}>
              <div className={styles.image} style={getIngredientImage(bun)}></div>
            </div>
            <div className={`${styles.imageWrapper} ${styles.imageWrapper2}`}>
              <div className={styles.image} style={getIngredientImage(meat03)}></div>
            </div>
            <div className={`${styles.imageWrapper} ${styles.imageWrapper3}`}>
              <div className={styles.image} style={getIngredientImage(core)}></div>
            </div>
          </div>
          <div className={styles.priceWrapper}>
            <p className='text text_type_digits-default'>560</p>
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </article>

      <article className={styles.card}>
        <div className={styles.orderId}>
          <p className={`text text_type_digits-default`}>#034534</p>
          <p className={styles.timestamp}>Сегодня, 16:20 i-GMT+3</p>
        </div>
        <h2 className={styles.title}>Interstellar бургер</h2>
        <div className={styles.components}>
          <div className={styles.imagesWrapper}>
            <div className={`${styles.imageWrapper} ${styles.imageWrapper1}`}>
              <div className={styles.image} style={getIngredientImage(bun)}></div>
            </div>
            <div className={`${styles.imageWrapper} ${styles.imageWrapper2}`}>
              <div className={styles.image} style={getIngredientImage(meat03)}></div>
            </div>
            <div className={`${styles.imageWrapper} ${styles.imageWrapper3}`}>
              <div className={styles.image} style={getIngredientImage(core)}></div>
            </div>
          </div>
          <div className={styles.priceWrapper}>
            <p className='text text_type_digits-default'>560</p>
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </article>

      <article className={styles.card}>
        <div className={styles.orderId}>
          <p className={`text text_type_digits-default`}>#034534</p>
          <p className={styles.timestamp}>Сегодня, 16:20 i-GMT+3</p>
        </div>
        <h2 className={styles.title}>Interstellar бургер</h2>
        <div className={styles.components}>
          <div className={styles.imagesWrapper}>
            <div className={`${styles.imageWrapper} ${styles.imageWrapper1}`}>
              <div className={styles.image} style={getIngredientImage(bun)}></div>
            </div>
            <div className={`${styles.imageWrapper} ${styles.imageWrapper2}`}>
              <div className={styles.image} style={getIngredientImage(meat03)}></div>
            </div>
            <div className={`${styles.imageWrapper} ${styles.imageWrapper3}`}>
              <div className={styles.image} style={getIngredientImage(core)}></div>
            </div>
          </div>
          <div className={styles.priceWrapper}>
            <p className='text text_type_digits-default'>560</p>
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </article>

      <article className={styles.card}>
        <div className={styles.orderId}>
          <p className={`text text_type_digits-default`}>#034534</p>
          <p className={styles.timestamp}>Сегодня, 16:20 i-GMT+3</p>
        </div>
        <h2 className={styles.title}>Interstellar бургер</h2>
        <div className={styles.components}>
          <div className={styles.imagesWrapper}>
            <div className={`${styles.imageWrapper} ${styles.imageWrapper1}`}>
              <div className={styles.image} style={getIngredientImage(bun)}></div>
            </div>
            <div className={`${styles.imageWrapper} ${styles.imageWrapper2}`}>
              <div className={styles.image} style={getIngredientImage(meat03)}></div>
            </div>
            <div className={`${styles.imageWrapper} ${styles.imageWrapper3}`}>
              <div className={styles.image} style={getIngredientImage(core)}></div>
            </div>
          </div>
          <div className={styles.priceWrapper}>
            <p className='text text_type_digits-default'>560</p>
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </article>
    </div>
  );
};
