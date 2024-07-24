import React, { RefObject, useState } from "react";
import Services from "@/services/Services";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/table";
import { Spinner } from "@nextui-org/spinner";
import { AsyncListData } from "react-stately";

interface Column<T> {
  key: keyof T;
  label: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  TableTopContent: React.ReactNode;
  hasMore: boolean;
  scrollRef: RefObject<HTMLElement>;
  loaderRef: RefObject<HTMLElement>;
  list: AsyncListData<unknown>;
  isLoading: boolean;
}

const CustomTable = <T,>({
  columns,
  data,
  TableTopContent,
  hasMore,
  scrollRef,
  loaderRef,
  isLoading,
  list,
}: TableProps<T>) => {

  
  const [showPaginatedButton, setShowPaginatedButton] = useState(false);

  const renderTopContent = () => {
    return (
      <div className="mt-10">
        {showPaginatedButton ? "Show Button Pagination" : "Infinte-scroll"}
      </div>
    );
  };;

  return (
    <div className="flex items-center justify-center px-4 py-4 lg:w-full md:max-[400px]">
      <Table
        isStriped
        isHeaderSticky
        aria-label="Infinite pagination"
        baseRef={scrollRef}
        selectionMode="multiple"
        topContent={TableTopContent}
        topContentPlacement="outside"
        bottomContent={
          hasMore ? (
            <div className="flex w-full justify-center">
              <Spinner ref={loaderRef} color="secondary" />
            </div>
          ) : null
        }
        classNames={{
          wrapper: "max-h-[400px]",
        }}
      >
        {/* <TableHeader columns={columns}>
          {(column) => (
            < key={column.key} className="text-purple-600 ">
              {column.label}
            </ TableColumn>
          )}
        </TableHeader> */}

        <TableHeader>
          <TableColumn key="name">Name</TableColumn>
          <TableColumn key="height">Height</TableColumn>
          <TableColumn key="mass">Mass</TableColumn>
          <TableColumn key="birth_year">Birth year</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          items={list.items}
          loadingContent={<Spinner color="white" />}
        >
          {(item) => (
            <TableRow key={item.name}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomTable;
