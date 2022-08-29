import React from "react";
import {AspectRatio, Card, Divider, Group, Image, Stack, Title, Text} from "@mantine/core";
import {observer} from "mobx-react";
import {Book} from "../../../store/BookStore";

type BookListingItemProps = {
  book: Book
}

const BookListingItemView = ({book}: BookListingItemProps) => {

  const img = book.images[0] || null
  const imgSrc = img != null ? `/api/image/${img}` : undefined;

  return (
    <Card shadow={"xl"}>
      <Group grow
             sx={{width: "50vw"}}
             onClick={() => {
             }}>
        <Card.Section px={"xl"} py={"sm"}>
          <AspectRatio ratio={720 / 1080} sx={{width: 100}} mx="auto">
            <Image
              src={imgSrc}
              alt={book.title}
              withPlaceholder
            />
          </AspectRatio>
        </Card.Section>
        <Stack>
          <Title order={1}>{book.title}</Title>
          <Divider my="sm" variant="dashed"/>
          <Text>{book.description}</Text>
        </Stack>
      </Group>
    </Card>
  )
}

export const BookListingItem = observer(BookListingItemView)