import React from "react";
import {AppShell} from "@mantine/core";
import {Footer} from "../components/footer/Footer";
import {Header} from "../components/header/Header";
import {BookListingContent} from "./components/BookListingContent";

export const BookListing = () => {
  return (
    <AppShell
      header={<Header/>}
      footer={<Footer/>}
    >
      <BookListingContent/>
    </AppShell>
  )
}