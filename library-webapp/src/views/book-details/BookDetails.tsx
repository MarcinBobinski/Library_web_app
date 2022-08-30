import React, {useEffect, useLayoutEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {AppShell, Text} from "@mantine/core";
import {Header} from "../components/header/Header";
import {Footer} from "../components/footer/Footer";
import {Book} from "../../store/BookStore";
import {observer} from "mobx-react";
import {useStore} from "../../store/store.context";

export const BookDetailsView = () => {
  const { id } = useParams();
  const idAsNumber = Number(id)
  const {bookStore} = useStore()
  const [book, setBook] = useState<Book | null>(null)

  useLayoutEffect(()=>{
    bookStore.clearLoaded()
  },[])

  useLayoutEffect(()=>{
    setBook(bookStore.bookDetailed)
    if(!isNaN(idAsNumber)){
      bookStore.loadBook(idAsNumber);
    }
  },[bookStore.bookDetailed])

  const bookCopy = {...book}

  return (
    <AppShell
      header={<Header/>}
      footer={<Footer/>}
    >
      <Text>ID: {bookCopy.id}</Text>

      <Text>Tytuł: {bookCopy.title}</Text>
      <Text>Opis: {bookCopy.description}</Text>
      <Text>Zdjęcia: {bookCopy.images}</Text>
    </AppShell>
  )
}

export const BookDetails = observer(BookDetailsView)
