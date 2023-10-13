import { FC } from 'react';
import { DateCellPropsI } from './DateCellProps';
import { dateFromTimestamp } from 'Utils/dateFromTimestamp';

export const DateCell: FC<DateCellPropsI> = ({ cellValue }) => {
  const formattedDate = dateFromTimestamp(cellValue);
  return <div>{formattedDate}</div>;
};
