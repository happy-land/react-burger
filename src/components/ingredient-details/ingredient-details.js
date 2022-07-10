import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getIngredient } from '../../services/actions/ingredients';

import styles from './ingredient-details.module.css';

export const IngredientDetails = () => {
  const dispatch = useDispatch();
  const { ingredient } = useSelector((store) => store.ingredients);

  const params = useParams();

  const init = async () => {
    await dispatch(getIngredient(params.id));
  };

  useEffect(() => {
    init();
  }, []);

  if (!ingredient) {
    return <p>Загрузка...</p>;
  }

  return (
    <>
      {ingredient && (
        <>
          <div className={styles.container}>
            <img src={ingredient.image_large} />
            <p className='text text_type_main-medium mt-4 mb-8'>{ingredient.name}</p>
            <ul className={styles.info}>
              <li className={styles.listItem}>
                <p className={`${styles.propHeader} text_color_inactive`}>
                  Калории, ккал
                </p>
                <p
                  className={`${styles.propValue} text text_type_digits-default text_color_inactive`}
                >
                  {ingredient.calories}
                </p>
              </li>
              <li className={styles.listItem}>
                <p className={`${styles.propHeader} text_color_inactive`}>Белки, г</p>
                <p
                  className={`${styles.propValue} text text_type_digits-default text_color_inactive`}
                >
                  {ingredient.proteins}
                </p>
              </li>
              <li className={styles.listItem}>
                <p className={`${styles.propHeader} text_color_inactive`}>Жиры, г</p>
                <p
                  className={`${styles.propValue} text text_type_digits-default text_color_inactive`}
                >
                  {ingredient.fat}
                </p>
              </li>
              <li className={styles.listItem}>
                <p className={`${styles.propHeader} text_color_inactive`}>Углеводы, г</p>
                <p
                  className={`${styles.propValue} text text_type_digits-default text_color_inactive`}
                >
                  {ingredient.carbohydrates}
                </p>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};
