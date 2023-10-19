import { FC, useEffect, useState } from 'react';
import { TokensIconsPropsI } from './TokenIconsProps';
import styles from './TokenIconsCell.module.scss';
import { Divider } from '../icons/Divider';
import polygonPopular from '../../data/polygonPopular.json';
import { ITokenObject } from '../../types/types';

export const TokenIconsCell: FC<TokensIconsPropsI> = ({ anchorCurrency, tokens }) => {
  const [anchorCurrencyInfo, setAnchorCurrencyInfo] = useState<ITokenObject | undefined>(undefined);
  const [tokensInfo, setTokensInfo] = useState<ITokenObject[] | []>([]);
  const polygonData: ITokenObject[] = polygonPopular;

  const getTokenIcon = (tokenAddress: string) => {
    for (const elem of polygonData) {
      if (elem.address === tokenAddress) {
        return elem;
      }
    }
  };

  const getAllTokensIcons = () => {
    setAnchorCurrencyInfo(getTokenIcon(anchorCurrency));
    const tokensInfoList: ITokenObject[] = tokens
      .map((token) => getTokenIcon(token))
      .filter((token): token is ITokenObject => {
        return token !== undefined;
      });
    setTokensInfo(tokensInfoList);
  };
  useEffect(() => {
    getAllTokensIcons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {anchorCurrencyInfo && tokensInfo && (
        <div className={styles.iconsList}>
          <img className={styles.icon} src={anchorCurrencyInfo.logoURI} alt='' />
          <Divider />
          <div className={styles.availableTokens}>
            {tokensInfo.slice(0, 7).map((token) => (
              <img key={token.address} className={styles.icon} src={token.logoURI} alt='' />
            ))}
            {tokens.length > 7 && (
              <div className={styles.tokensLeft}>{`+${tokens.length - 7}`}</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
