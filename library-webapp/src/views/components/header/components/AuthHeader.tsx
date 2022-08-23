import React from "react";
import {Group, Button, Menu} from "@mantine/core";
import {observer} from "mobx-react";
import {useStore} from "../../../../context/store.context";
import {IconLogout, IconUser, IconUserCircle} from "@tabler/icons";

const AuthHeaderView =  () => {
  const {authStore} = useStore()

  const credentials = {...authStore.credentials}

  if (authStore.isAuthenticated()) {
    return (<Group>
      <Menu>
        <Menu.Target>
          <Button leftIcon={<IconUser size={20}/>}>{credentials.username}</Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item icon={<IconUserCircle size={14}/>}>Profil</Menu.Item>
          <Menu.Item
            color={"red"}
            icon={<IconLogout size={14}/>}
            onClick={()=>{authStore.logout()}}>Wyloguj
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>)
  } else {
    return (
      <Group>
        <Button onClick={() => {authStore.login("Marcin", "haslo1")}}>Zaloguj</Button>
        <Button>Zarejestruj</Button>
      </Group>
    )
  }
}

export const AuthHeader = observer(AuthHeaderView)
