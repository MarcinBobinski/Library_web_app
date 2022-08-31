import React from "react";
import {AppShell, Center, Stack, Title} from "@mantine/core";
import {Header} from "../components/header/Header";
import {Footer} from "../components/footer/Footer";

export const NotFound = () => {
  return (
    <AppShell
      header={<Header/>}
      footer={<Footer/>}
    >
      <Title order={1} sx={{height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>PAGE NOT FOUND</Title>
    </AppShell>
  )
}
