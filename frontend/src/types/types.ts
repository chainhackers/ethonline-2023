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

export interface ITokenObject {
  chainId: number;
  name: string;
  symbol: string;
  decimals: number;
  address: string;
  logoURI?: string;
  tags: string[];
  extensions: {
    originTokenAddress?: string;
    project?: {
      name: string;
      summary: string;
      contact: string;
      website: string;
    };
    originTokenNetwork: number;
  };
}
