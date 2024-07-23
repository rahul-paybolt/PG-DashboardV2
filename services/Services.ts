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

const filterData = () =>{
  const list = useAsyncList({
    async load({ signal, filterText }) {
      let res = await fetch(
        `https://swapi.py4e.com/api/people/?search=${filterText}`,
        { signal }
      );
      let json = await res.json();
  
      return {
        items: json.results
      };
    }
  });
  return list;
}

export default {
  paginatedData,
}
