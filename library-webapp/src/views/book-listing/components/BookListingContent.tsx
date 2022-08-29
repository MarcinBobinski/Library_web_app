import React, {useEffect, useState} from "react";
import {Group, Pagination, Space, Stack} from "@mantine/core";
import {BookListingItem} from "./BookListingItem";
import {useStore} from "../../../store/store.context";
import {Book} from "../../../store/BookStore";
import {observer} from "mobx-react";

const BookListingContentView = () => {
  const {bookStore} = useStore()
  const [activePage, setPage] = useState(1);

  let items: Book[] = bookStore.booksPaged.get(activePage -1) || []
  let numberOfPages = bookStore.pages;

  useEffect(() => {
    bookStore.loadPage(activePage-1)
  },[activePage, bookStore.booksPaged.get(activePage -1)])

  return (
    <>
        <Stack align={"center"} justify={"center"}>
          {items.map((item, index) => {
            return (<BookListingItem book={item} key={index}/>)
          })}
        </Stack>

      <Space h={"xl"} />

      <Group position={"center"}>
        <Pagination page={activePage} onChange={setPage} total={numberOfPages} siblings={2}/>
      </Group>
    </>
  )
}

export const BookListingContent = observer(BookListingContentView)
