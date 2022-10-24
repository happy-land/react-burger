import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import styles from './ingredient-details.module.css';

export const IngredientDetails = () => {

  const { items } = useSelector((store) => store.ingredients);
  const [ingredientToShow, setIngredientToShow] = useState(null);
  const params = useParams();

  useEffect(() => {
    if (items.length > 0) {


  if (!ingredientToShow) {
    return <p>Загрузка...</p>;
  }

  return (
    <>
      {ingredientToShow && (
        <>
          <div className={styles.container}>
            <img src={ingredientToShow.image_large} alt={ingredientToShow.name} />
            <p className='text text_type_main-medium mt-4 mb-8'>{ingredientToShow.name}</p>
            <ul className={styles.info}>
              <li className={styles.listItem}>
                <p className={`${styles.propHeader} text_color_inactive`}>
                  Калории, ккал
                </p>
                <p
                  className={`${styles.propValue} text text_type_digits-default text_color_inactive`}
                >
                  {ingredientToShow.calories}
                </p>
              </li>
              <li className={styles.listItem}>
                <p className={`${styles.propHeader} text_color_inactive`}>Белки, г</p>
                <p
                  className={`${styles.propValue} text text_type_digits-default text_color_inactive`}
                >
                  {ingredientToShow.proteins}
                </p>
              </li>
              <li className={styles.listItem}>
                <p className={`${styles.propHeader} text_color_inactive`}>Жиры, г</p>
                <p
                  className={`${styles.propValue} text text_type_digits-default text_color_inactive`}
                >
                  {ingredientToShow.fat}
                </p>
              </li>
              <li className={styles.listItem}>
                <p className={`${styles.propHeader} text_color_inactive`}>Углеводы, г</p>
                <p
                  className={`${styles.propValue} text text_type_digits-default text_color_inactive`}
                >
                  {ingredientToShow.carbohydrates}
                </p>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};
