import React from "react";
import {Footer as FooterMantine, Group} from "@mantine/core";



export const Footer = () => {
  return (
    <FooterMantine height={60} p="md">
      <Group position={"center"}>Made by: Marcin Bobiński, Dawid Rokita & Marcin Uściński</Group>
    </FooterMantine>
  )
}
