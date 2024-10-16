// "use client";

// import React from "react";

// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   Selection,
//   SortDescriptor,
// } from "@nextui-org/table";
// import {
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownSection,
//   DropdownItem,
// } from "@nextui-org/dropdown";
// import { Button } from "@nextui-org/button";
// import { Chip, ChipProps } from "@nextui-org/chip";
// import {
//   columns,
//   statusOptions,
//   users,
// } from "@/lib/constants/recentTable/RecentTableData";
// import { User } from "@nextui-org/user";
// import { SearchIcon } from "@/lib/components/icons";
// import Input from "@/lib/components/InputContainer/Input";
// import {
//   Pagination,
//   PaginationItem,
//   PaginationCursor,
// } from "@nextui-org/pagination";
// import { VerticalDotsIcon } from "@/public/assests/Icon/VerticalDots";
// const statusColorMap: Record<string, ChipProps["color"]> = {
//   active: "success",
//   paused: "danger",
//   vacation: "warning",
// };

// const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

// type User = (typeof users)[0];

// const RecentTransactions = () => {
//   const [filterValue, setFilterValue] = React.useState("");
//   const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
//     new Set([])
//   );
//   const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
//     new Set(INITIAL_VISIBLE_COLUMNS)
//   );
//   const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);
//   const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
//     column: "age",
//     direction: "ascending",
//   });

//   const [page, setPage] = React.useState(1);

//   const hasSearchFilter = Boolean(filterValue);

//   const headerColumns = React.useMemo(() => {
//     if (visibleColumns === "all") return columns;

//     return columns.filter((column) =>
//       Array.from(visibleColumns).includes(column.uid)
//     );
//   }, [visibleColumns]);

//   const filteredItems = React.useMemo(() => {
//     let filteredUsers = [...users];

//     if (hasSearchFilter) {
//       filteredUsers = filteredUsers.filter((user) =>
//         user.name.toLowerCase().includes(filterValue.toLowerCase())
//       );
//     }
//     if (
//       statusFilter !== "all" &&
//       Array.from(statusFilter).length !== statusOptions.length
//     ) {
//       filteredUsers = filteredUsers.filter((user) =>
//         Array.from(statusFilter).includes(user.status)
//       );
//     }

//     return filteredUsers;
//   }, [users, filterValue, statusFilter]);

//   const pages = Math.ceil(filteredItems.length / rowsPerPage);

//   const items = React.useMemo(() => {
//     const start = (page - 1) * rowsPerPage;
//     const end = start + rowsPerPage;

//     return filteredItems.slice(start, end);
//   }, [page, filteredItems, rowsPerPage]);

//   const sortedItems = React.useMemo(() => {
//     return [...items].sort((a: User, b: User) => {
//       const first = a[sortDescriptor.column as keyof User] as number;
//       const second = b[sortDescriptor.column as keyof User] as number;
//       const cmp = first < second ? -1 : first > second ? 1 : 0;

//       return sortDescriptor.direction === "descending" ? -cmp : cmp;
//     });
//   }, [sortDescriptor, items]);

//   const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
//     const cellValue = user[columnKey as keyof User];

//     switch (columnKey) {
//       case "name":
//         return (
//           <User
//             avatarProps={{ radius: "lg", src: user.avatar }}
//             description={user.email}
//             name={cellValue}
//           >
//             {user.email}
//           </User>
//         );
//       case "role":
//         return (
//           <div className="flex flex-col">
//             <p className="text-bold text-small capitalize">{cellValue}</p>
//             <p className="text-bold text-tiny capitalize text-default-400">
//               {user.team}
//             </p>
//           </div>
//         );
//       case "status":
//         return (
//           <Chip
//             className="capitalize"
//             color={statusColorMap[user.status]}
//             size="sm"
//             variant="flat"
//           >
//             {cellValue}
//           </Chip>
//         );
//       case "actions":
//         return (
//           <div className="relative flex justify-start items-start">
//             <Dropdown>
//               <DropdownTrigger>
//                 <Button isIconOnly size="sm" variant="light">
//                   <VerticalDotsIcon className="text-default-300" />
//                 </Button>
//               </DropdownTrigger>
//               <DropdownMenu>
//                 <DropdownItem>View</DropdownItem>
//                 <DropdownItem>Edit</DropdownItem>
//                 <DropdownItem>Delete</DropdownItem>
//               </DropdownMenu>
//             </Dropdown>
//           </div>
//         );
//       default:
//         return cellValue;
//     }
//   }, []);

//   const onNextPage = React.useCallback(() => {
//     if (page < pages) {
//       setPage(page + 1);
//     }
//   }, [page, pages]);

//   const onPreviousPage = React.useCallback(() => {
//     if (page > 1) {
//       setPage(page - 1);
//     }
//   }, [page]);

//   const onRowsPerPageChange = React.useCallback(
//     (e: React.ChangeEvent<HTMLSelectElement>) => {
//       setRowsPerPage(Number(e.target.value));
//       setPage(1);
//     },
//     []
//   );

//   const onSearchChange = React.useCallback((value?: string) => {
//     if (value) {
//       setFilterValue(value);
//       setPage(1);
//     } else {
//       setFilterValue("");
//     }
//   }, []);

//   const onClear = React.useCallback(() => {
//     setFilterValue("");
//     setPage(1);
//   }, []);

//   const topContent = React.useMemo(() => {
//     return (
//       <div className="flex flex-col gap-4 rounded-md shadow-large px-4 py-4">
//         <div className="flex  gap-3 items-end">
//           <Input
//             className="w-full sm:max-w-[80%]"
//             placeholder="Search by name..."
//             startContent={<SearchIcon />}
//             value={filterValue}
//             // on={() => onClear()}
//             onValueChange={onSearchChange}
//             name="search"
//           />
//         </div>
//         <div className="flex justify-between items-center">
//           <span className="text-purple-400 text-small px-4">
//             Total {users.length} users
//           </span>
//           <label className="flex items-center text-purple-400 text-small px-4">
//             Rows per page:
//             <select
//               className="bg-transparent outline-none text-purple-400 text-small"
//               onChange={onRowsPerPageChange}
//             >
//               <option value="5">5</option>
//               <option value="10">10</option>
//               <option value="15">15</option>
//             </select>
//           </label>
//         </div>
//       </div>
//     );
//   }, [
//     filterValue,
//     statusFilter,
//     visibleColumns,
//     onSearchChange,
//     onRowsPerPageChange,
//     users.length,
//     hasSearchFilter,
//   ]);

//   const bottomContent = React.useMemo(() => {
//     return (
//       <div className="py-4 px-4 flex justify-between items-center shadow-large rounded-md">
//         <span className="w-[30%] text-small text-purple-600">
//           {selectedKeys === "all"
//             ? "All items selected"
//             : `${selectedKeys.size} of ${filteredItems.length} selected`}
//         </span>
//         <Pagination
//           isCompact
//           showControls
//           showShadow
//           color="secondary"
//           page={page}
//           total={pages}
//           onChange={setPage}
//         />
//         <div className="hidden sm:flex w-[30%] justify-end gap-2">
//           <Button
//             isDisabled={pages === 1}
//             size="sm"
//             variant="flat"
//             onPress={onPreviousPage}
//             color="secondary"
//           >
//             Previous
//           </Button>
//           <Button
//             isDisabled={pages === 1}
//             size="sm"
//             variant="flat"
//             onPress={onNextPage}
//             color="secondary"
//           >
//             Next
//           </Button>
//         </div>
//       </div>
//     );
//   }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

//   return (
//     <Table
//       aria-label="pagination and sorting"
//       isHeaderSticky
//       bottomContent={bottomContent}
//       bottomContentPlacement="outside"
//       classNames={{
//         wrapper: "max-h-[350px]",
//       }}
//       selectedKeys={selectedKeys}
//       selectionMode="multiple"
//       sortDescriptor={sortDescriptor}
//       topContent={topContent}
//       topContentPlacement="outside"
//       onSelectionChange={setSelectedKeys}
//       onSortChange={setSortDescriptor}
//       className="px-4 py-4"
//     >
//       <TableHeader columns={headerColumns}>
//         {(column) => (
//           <TableColumn
//             key={column.uid}
//             align={column.uid === "actions" ? "center" : "start"}
//             allowsSorting={column.sortable}
//             className="text-purple-600 hover:text-blue-400"
//           >
//             {column.name}
//           </TableColumn>
//         )}
//       </TableHeader>
//       <TableBody emptyContent={"No users found"} items={sortedItems}>
//         {(item) => (
//           <TableRow key={item.id}>
//             {(columnKey) => (
//               <TableCell>{renderCell(item, columnKey)}</TableCell>
//             )}
//           </TableRow>
//         )}
//       </TableBody>
//     </Table>
//   );
// };

// export default RecentTransactions;
// "use client";

// import Input from "@/lib/components/InputContainer/Input";
// import { SearchIcon } from "@/public/assests/Icon/SearchIcon";
// import { useRef, useState } from "react";
// import CustomDateRangePicker from "@/lib/components/DateRangePicker/DateRangePicker";
// import CustomSelect from "@/lib/components/SelectOptions/SelectOptions";
// import CustomTable from "@/lib/components/CustomTable/Table";
// import Services from "@/lib/services/Services";
// import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
// import { TransactionColumns } from "@/lib/constants/CustomTable/CustomTable";
// import SelectOptionsData from "@/lib/constants/dropdownConstants/SelectOptionData";

// const Transactions = () => {
//   const inputRef = useRef(null);
//   const [inputField, setInputField] = useState("");
//   const [selectedMerchants, setSelectedMerchants] = useState<string | null>("");
//   const handleSelection = (value: string | null) => {
//     setSelectedMerchants(value);
//   };

//   const { hasMore, isLoading, list } = Services.paginatedData();
//   const [loaderRef, scrollerRef] = useInfiniteScroll({
//     hasMore,
//     onLoadMore: list.loadMore,
//   });

//   const handleChange = (e: string) => {
//     list.setFilterText(e);
//   };

//   const SerchIcon = () => {
//     return (
//       <SearchIcon
//         className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"
//         height={12}
//         width={12}
//       />
//     );
//   };

//   // const TableTopContent = () => {
//   //   return (
//   //     <div className="flex items-center justify-between px-4 py-4 shadow-large rounded-md">
//   //       <Input
//   //         ref={inputRef}
//   //         label="Search Merchants"
//   //         placeholder="Type to search..."
//   //         type="search"
//   //         startContent={<SerchIcon />}
//   //         value={list.filterText}
//   //         onValueChange={list.setFilterText}
//   //         // loadingState={list.loadingState}
//   //         name="transactions"
//   //       />
//   //       <CustomDateRangePicker />
//   //       <CustomSelect
//   //         label="Merchants"
//   //         placeholder="Select Merchants"
//   //         value={selectedMerchants}
//   //         onChange={(value) => handleSelection(value)}
//   //         selectionData={SelectOptionsData}
//   //       />
//   //     </div>
//   //   );
//   // };

//   return (
//     <>
//       <CustomTable
//         columns={TransactionColumns}
//         // TableTopContent={<TableTopContent />}
//         hasMore={hasMore}
//         isLoading={isLoading}
//         list={list}
//         scrollRef={scrollerRef}
//         loaderRef={loaderRef}
//         data={list.items}
//       />
//     </>
//   );
// };

// export default Transactions;


const RecentTransactions = () => {
  return (
    <div>
      <h1>Recent Transactions</h1>
    </div>
  );
};

export default RecentTransactions;
