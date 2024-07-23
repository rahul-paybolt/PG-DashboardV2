"use client";
import React, { useState } from 'react'
import { useAsyncList } from 'react-stately';

const paginatedData = () =>{

  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const list = useAsyncList({
    async load({signal, cursor, filterText}) {

      if (cursor) {
        setIsLoading(false);
      }
      const res = await fetch(cursor ||  `https://swapi.py4e.com/api/people/?search=${filterText}`, {signal});
      let json = await res.json();

      setHasMore(json.next !== null);

      return {
        items: json.results,
        cursor: json.next,
      };
    },
  })
  return {hasMore,isLoading, list};
}

const ButtonPagination = (users) =>{
  console.log("users", users);
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;
  const pages = Math.ceil(users.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);
  return {items, page, pages, setPage};
}

export default {
  paginatedData,
  ButtonPagination
}
