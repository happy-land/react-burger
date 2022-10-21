import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { Card } from '../card/card';
import { menuItemPropTypes } from '../../utils/constants';
// import { data } from '../../utils/data';

const SECTION_BUN = 'Булки';
const SECTION_SAUCE = 'Соусы';
const SECTION_MAIN = 'Начинки';

export const BurgerIngredients = ({
  data,
  setIsIngredientDetailsOpened,
  setCurrentCardData,
}) => {
  const [current, setCurrent] = React.useState('one');

  const getCategory = (itemType) => {
    return data.filter((item) => {
      return item.type === itemType;
    });
  };

  const buns = getCategory('bun');
  const sauces = getCategory('sauce');
  const mains = getCategory('main');

  const onCardClick = (data) => {
    setIsIngredientDetailsOpened(true);
    setCurrentCardData(data);
  };

  const renderSection = (section, name) => {
    return (
      <section>
        <h2 className={styles.sectionTitle}>{name}</h2>
        <div className={`${styles.cardArea} mt-6 mb-10 pl-4`}>
          {section.map((item, index) => (
            <Card key={item._id} data={item} onClick={onCardClick} />
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

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(menuItemPropTypes).isRequired,
  setIsIngredientDetailsOpened: PropTypes.func.isRequired,
  setCurrentCardData: PropTypes.func.isRequired,
};
