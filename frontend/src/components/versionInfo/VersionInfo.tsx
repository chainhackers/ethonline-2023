import styles from './VersionInfo.module.scss';

interface IVersionInfo {
  version: string;
  versionDate: string;
}

function VersionInfo(props: IVersionInfo) {
  return (
    <div className={styles.versionInfoBox}>
      <p className={styles.versionInfoItem}>
        <span className={styles.versionInfoName}>Version: </span>
        {props.version}
      </p>
      <p className={styles.versionInfoItem}>
        <span className={styles.versionInfoName}>Date: </span>
        {props.versionDate}
      </p>
    </div>
  );
}

export default VersionInfo;
