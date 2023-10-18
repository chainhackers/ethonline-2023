import { IToken } from '../types/types';

export const getFindToken = (arr: Array<IToken>, address: string) => {
  const result = arr.find((item) => item.address === address);
  return result;
};
