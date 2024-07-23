import React, { useState } from "react";
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
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { Spinner } from "@nextui-org/spinner";
import Input from "../InputContainer/Input";
import { Button } from "@nextui-org/button";
interface Column<T> {
  key: keyof T;
  label: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  TableTopContent: React.ReactNode;
}

const CustomTable = <T,>({ columns, data , TableTopContent}: TableProps<T>) => {
  const { hasMore, isLoading, list } = Services.paginatedData();
  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore,
    onLoadMore: list.loadMore,
  });
  const [showPaginatedButton, setShowPaginatedButton] = useState(false);


  const handleInputChange = (e) => {
    list.setFilterText(e.target.value);
  };

  const renderTopContent = () =>{
    return (
      <div className="mt-10">{showPaginatedButton ? "Show Button Pagination" : "Infinte-scroll"}</div>
    )
  }

  return (
    <div className="flex items-center justify-center px-4 py-4 lg:w-full md:max-[400px] shadow-large">
      <Table
        isStriped
        isHeaderSticky
        aria-label="Infinite pagination"
        baseRef={scrollerRef}
        selectionMode="multiple"
        topContent={TableTopContent}
        bottomContent={
          hasMore ? (
            <div className="flex w-full justify-center">
              <Spinner ref={loaderRef} color="secondary" />
            </div>
          ) : null
        }
        
        classNames={{
          base: "max-h-[600px] overflow-scroll",
          table: "min-h-[600px]",
        }}
      >
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
