export interface TablePropsI {
  tableData: {
    address: string;
    operatorFee: number;
    anchorCurrency: string;
    allowedTokens: string[];
  }[];
}
