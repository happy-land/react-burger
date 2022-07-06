import PropTypes from 'prop-types';
import { menuItemPropTypes } from '../../utils/constants';
import styles from './ingredient-details.module.css';

export const IngredientDetails = ({ data }) => {
  return (
    <div className={styles.container}>
      <img src={data.image_large} />
      <p className='text text_type_main-medium mt-4 mb-8'>{data.name}</p>
      <ul className={styles.info}>
        <li className={styles.listItem}>
          <p className={`${styles.propHeader} text_color_inactive`}>Калории, ккал</p>
          <p className={`${styles.propValue} text text_type_digits-default text_color_inactive`}>{data.calories}</p>
        </li>
        <li className={styles.listItem}>
          <p className={`${styles.propHeader} text_color_inactive`}>Белки, г</p>
          <p className={`${styles.propValue} text text_type_digits-default text_color_inactive`}>{data.proteins}</p>
        </li>
        <li className={styles.listItem}>
          <p className={`${styles.propHeader} text_color_inactive`}>Жиры, г</p>
          <p className={`${styles.propValue} text text_type_digits-default text_color_inactive`}>{data.fat}</p>
        </li>
        <li className={styles.listItem}>
          <p className={`${styles.propHeader} text_color_inactive`}>Углеводы, г</p>
          <p className={`${styles.propValue} text text_type_digits-default text_color_inactive`}>{data.carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
};

IngredientDetails.propTypes = {
  data: menuItemPropTypes.isRequired,
}