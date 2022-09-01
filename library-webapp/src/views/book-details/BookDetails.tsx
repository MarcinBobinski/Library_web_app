import React, {useEffect, useLayoutEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {AppShell, AspectRatio, Group, Image, Stack, Text, Paper, Title} from "@mantine/core";
import Carousel from 'react-bootstrap/Carousel';
import {Header} from "../components/header/Header";
import {Footer} from "../components/footer/Footer";
import {Book} from "../../store/BookStore";
import {observer} from "mobx-react";
import {useStore} from "../../store/store.context";
import {RentPanel} from "./RentPanel";

export const BookDetailsView = () => {
  const {id} = useParams();
  const idAsNumber = Number(id)
  const {bookStore, authStore} = useStore()
  const [book, setBook] = useState<Book | null>(null)

  useLayoutEffect(() => { bookStore.clearLoaded() }, [])

  useLayoutEffect(() => {
    setBook(bookStore.bookDetailed)
    if (!isNaN(idAsNumber)) { bookStore.loadBook(idAsNumber); }
  }, [bookStore.bookDetailed])

  const bookCopy = {...book}
  const bookImages = (bookCopy.images || []).map((imageId) => `/api/image/${imageId}`)


  const rentPanel = authStore.isAuthenticated() ? (<Title order={4}><Text>Wypożycz1</Text></Title>) : (<Title order={4}><Text>Wypożycz2</Text></Title>)

  return (
    <AppShell header={<Header/>} footer={<Footer/>}>
      <Group position={"center"}>
        <Stack spacing={"xl"} sx={{width: "70vw", maxWidth: "1200px"}}>
          <Title order={1}><Text italic weight={700}>{bookCopy.title}</Text></Title>

          <Group noWrap position={"apart"}>
            <Paper shadow="xl" radius="xl" p="lg" withBorder
              sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[4],
                width: "45%",
              })}
            >
              <Carousel style={{color: "red"}}>
                {bookImages.map((item, index) => (<Carousel.Item key={index}>
                    <AspectRatio ratio={720 / 1080} mx="auto">
                      <Image src={item} alt={bookCopy.title} withPlaceholder/>
                    </AspectRatio>
                  </Carousel.Item>))}
              </Carousel>
            </Paper>

            <Paper shadow="xl" radius="xl" p="lg" withBorder
                   sx={(theme) => ({
                     backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[4],
                     width: "45%"
                   })}
            >
              <Stack justify="space-between">
                <Title order={4}><Text>Wypożycz</Text></Title>
                {authStore.credentials != null ?
                  <RentPanel/>
                  :
                  <Text>Aby móc wypożyczyć książkę należy być zalogowanym.</Text>
                }
              </Stack>
            </Paper>
          </Group>

          <Paper shadow="xl" radius="xl" p="lg" withBorder
                 sx={(theme) => ({
                   backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[4],
                 })}
          >
            {bookCopy.description}
          </Paper>

        </Stack>
      </Group>
    </AppShell>
  )
}

export const BookDetails = observer(BookDetailsView)
