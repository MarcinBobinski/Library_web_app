import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import {Button} from "@mantine/core";
import {useStore} from "../../../../store/store.context";
import {AddBookModal} from "../modal/AddBookModal";
import {IconPlus} from "@tabler/icons";

const AdminHeaderView = () => {
  const {authStore} = useStore()
  const [addBookOpened, addBookOpenedSet] = useState(false)

  const [isAdmin, setAdmin] = useState(false)

  useEffect(()=> {
    setAdmin(authStore.isAdmin())
  },[authStore.credentials])

  if (!isAdmin) {
    return (<></>)
  }

  return (
    <>
      <AddBookModal opened={addBookOpened} setOpened={addBookOpenedSet}/>
      <Button color="green" leftIcon={<IconPlus size={18}/>} onClick={() => {
        addBookOpenedSet(true)
      }}>Dodaj książkę</Button>
    </>
  )
}

export const AdminHeader = observer(AdminHeaderView)