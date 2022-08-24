import React, {useState} from "react";
import {Group, Button, Menu} from "@mantine/core";
import {observer} from "mobx-react";
import {useStore} from "../../../../context/store.context";
import {IconLogout, IconUser, IconUserCircle} from "@tabler/icons";
import {LoginModal} from "../modal/LoginModal";
import {RegisterModal} from "../modal/RegisterModal";

const AuthHeaderView =  () => {
  const {authStore} = useStore()
  const credentials = {...authStore.credentials}

  const [registerOpened, registerOpenedSet] = useState(false)
  const [loginOpened, loginOpenedSet] = useState(false)

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
      <>
        <LoginModal opened={loginOpened} setOpened={loginOpenedSet} authStore={authStore}/>
        <RegisterModal opened={registerOpened} setOpened={registerOpenedSet} authStore={authStore}/>
        <Group>
          <Button onClick={() => {loginOpenedSet(true)}}>Zaloguj</Button>
          <Button onClick={() => {registerOpenedSet(true)}}>Zarejestruj</Button>
        </Group>
      </>
    )
  }
}

export const AuthHeader = observer(AuthHeaderView)
