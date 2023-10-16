export interface IModal {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

export interface IToken {
  name: string;
  address: string;
  decimals: number;
  iconPath: string;
}

export interface ITokens {
  [token: string]: IToken;
}

export interface IToketSelect {
  isOpen: boolean;
  limit: number;
  data: ITokens;
  name?: string;
  onClose: (value: Array<IToken>) => void;
  selected: Array<IToken>;
  defaultSelected?: Array<IToken>;
}
