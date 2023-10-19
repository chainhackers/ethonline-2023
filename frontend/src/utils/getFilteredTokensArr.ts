import { IToken } from '../types/types';

export const getFilteredTokensArr = (arr: Array<IToken>, address: string) => {
  const result = arr.filter((item) => item.address !== address);
  return result;
};
