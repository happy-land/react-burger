import React from 'react';
import { CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { data } from '../../utils/data';

const SECTION_BUN = 'Булки';
const SECTION_SAUCE = 'Соусы';
const SECTION_MAIN = 'Начинки';

export const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState('one');

  const getCategory = (itemType) => {
    return data.filter((item) => {
      return item.type === itemType;
    });
  };

  const buns = getCategory('bun');
  const sauces = getCategory('sauce');
  const mains = getCategory('main');

  console.log(`buns: ${buns[1].name}`);

  const renderSection = (section, name) => {
    return (
      <section>
        <h2 className={styles.sectionTitle}>{name}</h2>
        <div className={`${styles.cardArea} mt-6 mb-10 pl-4`}>
          {section.map((item, index) => (
            <article className={styles.card} key={index}>
              <img className={styles.image} src={item.image} />
              <div className={`${styles.priceContainer} mt-1 mb-1`}>
                <p className='text text_type_digits-default mr-2'>{item.price}</p>
                <CurrencyIcon type='primary' />
              </div>
              <p className='text text_type_main-small'>{item.name}</p>
            </article>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>
        Соберите бургер
      </h1>
      <div className={styles.tabs}>
        <Tab value='bun' active={current === 'bun'} onClick={setCurrent}>
          {SECTION_BUN}
        </Tab>
        <Tab value='sauce' active={current === 'sauce'} onClick={setCurrent}>
          {SECTION_SAUCE}
        </Tab>
        <Tab value='main' active={current === 'main'} onClick={setCurrent}>
          {SECTION_MAIN}
        </Tab>
      </div>
      <div className={`${styles.sectionArea} mt-10`}>
        {renderSection(buns, SECTION_BUN)}
        {renderSection(sauces, SECTION_SAUCE)}
        {renderSection(mains, SECTION_MAIN)}
      </div>
    </div>
  );
};
