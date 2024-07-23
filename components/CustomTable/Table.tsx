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

const CustomTable = () => {
  const { hasMore, isLoading, list } = Services.paginatedData();
  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore,
    onLoadMore: list.loadMore,
  });

  const handleInputChange = (e) => {
    list.setFilterText(e.target.value);
  };

  return (
    <div className="px-2 py-2">
      <Input 
        type="text" 
        value={list.filterText} 
        onChange={handleInputChange} 
        placeholder="Search Star Wars Characters"
      />
      <Table
        isStriped
        isHeaderSticky
        aria-label="Example table with infinite pagination"
        baseRef={scrollerRef}
        selectionMode="multiple"
        bottomContent={
          hasMore ? (
            <div className="flex w-full justify-center">
              <Spinner ref={loaderRef} color="white" />
            </div>
          ) : null
        }
        classNames={{
          base: "max-h-[520px] overflow-scroll",
          table: "min-h-[400px]",
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
