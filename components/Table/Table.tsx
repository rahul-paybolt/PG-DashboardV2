import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";

interface Props {
  columns: {
    key: string;
    label: string;
  }[];
  rows: Record<string, any>[];
  className?: string;
  ariaLabel?: string;
}

export const TableComponent = ({
  columns,
  rows,
  className = "",
  ariaLabel,
}: Props) => {
  return (
    <Table aria-label={ariaLabel} className={className}>
      <TableHeader columns={columns}>
        {column => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {item => (
          <TableRow key={item.key}>
            {columnKey => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
