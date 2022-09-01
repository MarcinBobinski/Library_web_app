import React, {useEffect} from "react";
import {AppShell, Group, Paper, Stack, Text, Title, Divider, SimpleGrid, Table, Button, ActionIcon} from "@mantine/core";
import {Header} from "../components/header/Header";
import {Footer} from "../components/footer/Footer";
import {observer} from "mobx-react";
import {useStore} from "../../store/store.context";
import {IconBookDownload, IconCheck, IconTruckReturn, IconX} from "@tabler/icons";
import {useNavigate} from "react-router-dom";
import {showNotification} from "@mantine/notifications";

const UserDetailsView = () => {
  const {authStore, rentStore} = useStore()
  const credentials = {...authStore.credentials}
  const navigate = useNavigate()

  useEffect(()=>{
    if(authStore.credentials == null) {navigate("/books")}
  },[authStore.credentials])

  useEffect(()=>{rentStore.fetchRents()},[rentStore.rentedBooks])

  const rentedBooks = [...rentStore.rentedBooks || []]
    .sort((i1,i2) => i1.id - i2.id)
    .map((item) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.bookTitle}</td>
      <td>{item.rentedAt}</td>
      <td>{item.expectedReturnAt}</td>
      <td>{item.returnedAt}</td>
      <td>{item.returnedAt == null ? <ActionIcon onClick={()=>{
        rentStore.returnRent(item.id)
          .then(()=>{
            rentStore.clear()
            showNotification({
              icon: <IconCheck size={18}/>,
              title: "Sukces",
              message: "Pomyślnie oddano książkę.",
              color: 'green',
              autoClose: 5000
            })
          })
          .catch(()=>{
            showNotification({
              icon: <IconX size={18}/>,
              title: "Błąd",
              message: "Oddanie książki nie powiodło się prosimy spróbować jeszcze raz.",
              color: 'red',
              autoClose: 5000
            })
          })
      }}><IconBookDownload size={25}/></ActionIcon>:<></>}</td>
    </tr>
  ))

  console.log(rentedBooks)

  return (
    <AppShell
      header={<Header/>}
      footer={<Footer/>}
    >
      <Group position={"center"}>
        <Stack sx={{width: "70vw", height: "100px"}} >
          <Paper shadow="xl" radius="xl" p="lg" withBorder
                 sx={(theme) => ({
                   backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.blue[0],
                 })}
          >
            <Stack spacing={"xs"}>
              <Stack spacing={0}>
                <Title order={3}>Dane Użytkownika</Title>
                <Divider my="sm" variant="dashed" />
              </Stack>
              <SimpleGrid cols={2} sx={{width: "50%"}}>
                <Text weight={700}>Login: </Text><Text>{credentials.username}</Text>
                <Text weight={700}>Email: </Text><Text>{credentials.email}</Text>
                <Text weight={700}>Id użytkownika: </Text><Text>{credentials.id}</Text>
              </SimpleGrid>
              <Stack>
              </Stack>
            </Stack>
          </Paper>

          <Paper shadow="xs" radius="xl" p="lg" withBorder
                 sx={(theme) => ({
                   backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.blue[0],
                 })}
          >
            <Stack spacing={"xl"}>
              <Stack spacing={0}>
                <Title order={3}>Wypożyczenia</Title>
                <Divider my="sm" variant="dashed" />
              </Stack>
              <Table>
                <thead>
                <tr>
                  <th>ID</th>
                  <th>Tytuł</th>
                  <th>Data wypożyczenia</th>
                  <th>Data oczekiwanego zwrotu</th>
                  <th>Data oddania</th>
                  <th>Oddaj</th>
                </tr>
                </thead>
                <tbody>{rentedBooks}</tbody>
              </Table>
              <Stack>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Group>
    </AppShell>
  )
}

export const UserDetails = observer(UserDetailsView)
