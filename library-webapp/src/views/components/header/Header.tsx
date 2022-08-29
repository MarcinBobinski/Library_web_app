import React from "react";
import {Link} from "react-router-dom";
import {BookSearch} from "./components/BookSearch";
import {AuthHeader} from "./components/AuthHeader";
import {Header as HeaderMantine, Button, Group, Text} from "@mantine/core";
import {ThemeColorSwitch} from "./components/ThemeColorSwitch";
import {AdminHeader} from "./components/AdminHeader";

export const Header = () => {
  return (
    <HeaderMantine height={60} p={"xs"}>
      <Group position={"apart"} px={"md"}>
        <Text
          size={"xl"}
          variant={"gradient"}
          gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
          weight={700}
          component={Link}
          to={"/books"}
        >
          Biblioteka OKNO PW
        </Text>
        <BookSearch/>
        <AdminHeader/>
        <Group>
          <AuthHeader/>
          <ThemeColorSwitch/>
        </Group>
      </Group>
    </HeaderMantine>
  )
}
