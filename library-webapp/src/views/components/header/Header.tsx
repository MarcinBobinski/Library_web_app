import React from "react";
import {Link} from "react-router-dom";
import {BookSearch} from "./components/BookSearch";
import {AuthHeader} from "./components/AuthHeader";
import {Header as HeaderMantine, Button, Group} from "@mantine/core";
import {ThemeColorSwitch} from "./components/ThemeColorSwitch";

export const Header = () => {
  return (
    <HeaderMantine height={60} p={"xs"}>
      <Group position={"apart"} px={"md"}>
        <Button component={Link} to={"/books"}>
          Biblioteka
        </Button>
        <BookSearch/>
        <Group>
          <AuthHeader/>
          <ThemeColorSwitch/>
        </Group>
      </Group>
    </HeaderMantine>
  )
}
