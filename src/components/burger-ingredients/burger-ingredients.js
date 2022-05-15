import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { Card } from '../card/card';
import { getIngredients } from '../../services/actions/ingredients';
import { openIngredientModal } from '../../services/actions/ingredientDetails';
import { INCREASE_COUNTER } from '../../services/actions/ingredient';

const SECTION_BUN = 'Булки';
const SECTION_SAUCE = 'Соусы';
const SECTION_MAIN = 'Начинки';

export const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((store) => store.ingredients);

  // burgerItems - передадим в Card
  // store.burger.items - массив ингедирентов бургера

  const burgerItems = useSelector((store) => store.burger.items);
  const bun = useSelector((store) => store.burger.bun);

  const [current, setCurrent] = React.useState('bun');

  const [counters, setCounters] = useState([]);

  const getCategory = (itemType) => {
    return items.filter((item) => {
      return item.type === itemType;
    });
  };

  const buns = getCategory('bun');
  const sauces = getCategory('sauce');
  const mains = getCategory('main');

  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();

  const onCardClick = (item) => {
    dispatch(openIngredientModal(item));
    dispatch({
      type: INCREASE_COUNTER
    })
  };

  const renderSection = (section, name, ref) => {
    return (
      <section ref={ref}>
        <h2 className={styles.sectionTitle}>{name}</h2>
        <div className={`${styles.cardArea} mt-6 mb-10 pl-4`}>
          {section.map((item, index) => (
            <Card
              key={item._id}
              data={item}
              counter={item.counter}
              onClick={() => onCardClick(item)}
            />
          ))}
        </div>
      </section>
    );
  };

  const toggleTab = () => {
    const tabElementPosition = (type, ref) => {
      return {
        type,
        y: Math.abs(ref.current.getBoundingClientRect().y - 400),
      };
    };
    const tabs = [];
    tabs.push(tabElementPosition('bun', bunRef));
    tabs.push(tabElementPosition('sauce', sauceRef));
    tabs.push(tabElementPosition('main', mainRef));

    const topType = tabs.reduce((p, c) => {
      return c.y < p.y ? c : p;
    });

    if (topType.type !== current) {
      setCurrent(topType.type);
    }
  };

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  useEffect(() => {
    const counterArr = [];
    items.map((item, index) => {
      if (item.type === 'bun') {
        if (bun) {
          bun._id === item._id ? item.counter = 1 : item.counter = 0;
        } else {
          item.counter = 0;
        }
      } else {
        const res = burgerItems.filter(resItem => resItem._id === item._id);
        item.counter = res.length;
      }
    });

    setCounters(counterArr);

  }, [items, burgerItems, bun]);

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
      <div className={`${styles.sectionArea} mt-10`} onScroll={toggleTab}>
        {renderSection(buns, SECTION_BUN, bunRef)}
        {renderSection(sauces, SECTION_SAUCE, sauceRef)}
        {renderSection(mains, SECTION_MAIN, mainRef)}
      </div>
    </div>
  );
};
