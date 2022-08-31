import React from "react";
import {AppShell, Group, Paper, Stack, Text, Title, Divider, SimpleGrid} from "@mantine/core";
import {Header} from "../components/header/Header";
import {Footer} from "../components/footer/Footer";
import {observer} from "mobx-react";
import {useStore} from "../../store/store.context";

const UserDetailsView = () => {

  const {authStore} = useStore()
  const credentials = {...authStore.credentials}

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
