import React from "react";
import {observer} from "mobx-react";
import {useStore} from "../../store/store.context";
import {Button, Group, Text} from "@mantine/core"
import {useParams} from "react-router-dom";
import {showNotification} from "@mantine/notifications";
import {IconX} from "@tabler/icons";

const RentPanelView = () => {
  const {id} = useParams();
  const idAsNumber = Number(id)
  const {rentStore} = useStore()

  const onRentButtonClick = () => {
    rentStore.rentBook(idAsNumber)
      .then( () => {
        showNotification({
          title: 'Wypożyczono',
          message: 'Prawidłowo wypożyczono książkę.',
          color: 'green',
          autoClose: 5000
        })
        }).catch(()=>{
      showNotification({
        icon: <IconX size={18}/>,
        title: 'Błąd',
        message: 'Z nieznanego powodu nie udało się wypożyczyć książki.',
        color: 'red',
        autoClose: 5000
      })
      })
  }

  return (
    <>
      <Group>
        <Text>Aby wypożyczyć książkę naciśnij przycisk:</Text>
        <Button onClick={onRentButtonClick}>Wypożycz</Button>
      </Group>
    </>
  )

}

export const RentPanel = observer(RentPanelView)