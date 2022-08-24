import React from "react";
import {AppShell, Group} from "@mantine/core";
import {Footer} from "../components/footer/Footer";
import {Header} from "../components/header/Header";

export const BookListing = () => {
  return (
    <AppShell
      header={<Header/>}
      footer={<Footer/>}
    >
      <Group>
        BookListingPage
      </Group>
    </AppShell>
  )
}
