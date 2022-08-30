import React from "react";
import {AspectRatio, Card, Divider, Group, Image, Stack, Title, Text, Paper, Spoiler} from "@mantine/core";
import {observer} from "mobx-react";
import {Book} from "../../../store/BookStore";
import {useNavigate} from "react-router-dom";

type BookListingItemProps = {
  book: Book
}

const BookListingItemView = ({book}: BookListingItemProps) => {
  const navigate = useNavigate()

  const img = book.images[0] || null
  const imgSrc = img != null ? `/api/image/${img}` : undefined;

  return (
    <Paper
      shadow="xl"
      radius="md"
      p="lg"
      withBorder
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.blue[0],
        width: "50vw",
        maxWidth: "1000px",
      })}
    >
      <Group
        noWrap
        position={"apart"}
      >
          <AspectRatio ratio={720 / 1080} sx={{width: "20%"}} mx="auto" onClick={() => {navigate(`/book/${book.id}`)}}>
            <Image
              src={imgSrc}
              alt={book.title}
              withPlaceholder
            />
          </AspectRatio>
        <Stack
          sx={{
          width: "70%"
        }}>
          <Title order={3} onClick={() => {navigate(`/book/${book.id}`)}}>{book.title}</Title>
          <Divider variant="dashed"/>
          <Spoiler maxHeight={120} hideLabel="ukryj" showLabel="pokaż więcej...">
            <Text>{book.description}</Text>
          </Spoiler>
        </Stack>
      </Group>
    </Paper>
  )
}

export const BookListingItem = observer(BookListingItemView)