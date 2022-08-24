import React from "react";
import {Group, Button, Autocomplete} from "@mantine/core";

export const BookSearch = () => {
  return (
    <Group>
      <Autocomplete data={['ksiazka1', 'ksiazka2', 'ksiazka3']}/>
      <Button>Szukaj</Button>
    </Group>
  )
}
