import { FC } from 'react';
interface ICard {
  title: string;
  descriptionList: string[];
}
import styles from './Card.module.scss';

export const Card: FC<ICard> = ({ title, descriptionList }) => {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <ul>
        {descriptionList.map((descriptionItem: string) => (
          <li>{descriptionItem}</li>
        ))}
      </ul>
    </div>
  );
};
