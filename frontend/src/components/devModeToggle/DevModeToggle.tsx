import styles from './DevModeToggle.module.scss';

interface IDevModeToggle {
  isDevMode: boolean;
  handleToggleDevMode: (value: boolean) => void;
}

function DevModeToggle(props: IDevModeToggle) {
  const { isDevMode = false, handleToggleDevMode } = props;

  const handleClick = () => {
    handleToggleDevMode(!isDevMode);
  };

  return (
    <button className={styles.devModeToggle} onClick={handleClick}>
      {isDevMode ? 'DEV ON' : 'DEV OFF'}
    </button>
  );
}

export default DevModeToggle;
