/* eslint-disable react-hooks/exhaustive-deps */
import styles from './PoolDetail.module.scss';
import { publicClientViem } from 'src/wagmiConfig';
import { useCallback, useEffect, useState } from 'react';
import { abiReadPool } from 'src/abi/abiReadPool';
import { useParams } from 'react-router-dom';

function PoolDetail() {
  const { poolAddress } = useParams();
  const [poolData, setPoolData] = useState<string>('');

  const getPoolData = useCallback(async () => {
    const data = await publicClientViem.readContract({
      address: poolAddress as `0x${string}`,
      abi: abiReadPool,
      functionName: 'anchorCurrency',
    });

    setPoolData(data as string);
  }, []);

  useEffect(() => {
    if (!poolData.length && poolAddress) {
      getPoolData();
    }
  }, [poolAddress]);

  return (
    <div className={styles.pool}>
      <div className={styles.pool__inner}>
        <div className={styles.pool__header}>
          <p className={styles.pool__address}>{poolAddress}</p>
        </div>
        <div className={styles.pool__detail}>
          <p>Anchor currency: {poolData}</p>
        </div>
      </div>
    </div>
  );
}

export default PoolDetail;
