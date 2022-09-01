import React, {useEffect, useState} from "react";
import {
  Group,
  Modal,
  Button,
  TextInput,
  LoadingOverlay,
  useMantineTheme,
  Text,
  Textarea,
  Table
} from "@mantine/core";
import {useForm} from "@mantine/form";
import {IconCheck, IconPhoto, IconUpload, IconX} from "@tabler/icons";
import {Dropzone, IMAGE_MIME_TYPE, MIME_TYPES} from "@mantine/dropzone";
import {showNotification} from "@mantine/notifications";
import {FileRejection} from "react-dropzone";
import {useStore} from "../../../../store/store.context";
import {useListState} from "@mantine/hooks";

type AddBookModalProps = {
  opened: boolean,
  setOpened: (opened: boolean) => void;
}

export const AddBookModal = ({opened, setOpened}: AddBookModalProps) => {
  const {authStore, bookStore, imageStore} = useStore()
  const theme = useMantineTheme();

  const [isLoading, setLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)

  type ImageListItem = {
    id: number,
    file: File
  }
  const [imageList, imageListHandler] = useListState<ImageListItem>([])

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
    },
    validate: {}
  })
  useEffect(() => {form.clearErrors()}, [opened])

  const onSubmit = async ({title, description}: { title: string, description: string }) => {
    setLoading(true)
    const success = await bookStore.addBook(title, description, imageList.map((element) => element.id))
    if(success){
      showNotification({
        icon: <IconCheck size={18}/>,
        title: 'Sukces',
        message: `Prawidłowo dodano książkę.`,
        color: 'green',
        autoClose: 5000
      })
    }
    bookStore.clearLoaded()
    setLoading(false)
    setOpened(false)
  }

  const onImageReject = (files: FileRejection[]) => {
    showNotification({
      icon: <IconX size={18}/>,
      title: 'Błąd ładowania zdjęć',
      message: `Błąd ładowania następujących zdjęć: ${files.map((file) => file.file.name).toString()}. Sprawdź rozmiar plików oraz ich rozszerzenie.`,
      color: 'red',
      autoClose: 5000
    })
  }

  const onImageAccept = async (files: File[]) => {
    setImageLoading(true)
    for (let file of files){
      try {
        const fileArray = await new Uint8Array(await file.arrayBuffer())
        const fileUploadId = await imageStore.uploadImage(fileArray)
        imageListHandler.append({id: fileUploadId, file: file});
      } catch (e){
        showNotification({
          icon: <IconX size={18}/>,
          title: 'Błąd ładowania zdjęć',
          message: `Nie udało się załadować następującego pliku: ${file.name}`,
          color: 'red',
          autoClose: 5000
        })
      }

    }
    setImageLoading(false)
  }

  const imageTableRows = imageList.map((element) => (
    <tr key={element.id}>
      <td><p>{element.id.toString()}</p></td>
      <td><p>{element.file.name}</p></td>
      <td><p>X</p></td>
    </tr>
  ))

  return (
    <Modal
      size={"xl"}
      opened={opened}
      onClose={() => {
        setOpened(false)
      }} title={"Zaloguj się"}
      centered
    >

      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          label="Tytuł"
          placeholder="Tytuł"
          {...form.getInputProps('title')}
        />

        <Textarea
          mt={"md"}
          label="Opis"
          placeholder="Opis"
          {...form.getInputProps('description')}
        />

        <Table my={"md"}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nazwa Pliku</th>
              <th>Usuń</th>
            </tr>
          </thead>
          <tbody>{imageTableRows}</tbody>
        </Table>

        <Dropzone
          loading={imageLoading}
          mt={"md"}
          onDrop={onImageAccept}
          onReject={onImageReject}
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
        >
          <Group position="center" spacing="xl" style={{minHeight: 100, pointerEvents: 'none'}}>
            <Dropzone.Accept>
              <IconUpload
                size={50}
                stroke={1.5}
                color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                size={50}
                stroke={1.5}
                color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto size={50} stroke={1.5}/>
            </Dropzone.Idle>
            <div>
              <Text size="xl" inline>
                Drag images here or click to select files
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                Attach as many files as you like, each file should not exceed 5mb
              </Text>
            </div>
          </Group>
        </Dropzone>

        <Group position={"center"} mt={"md"}>
          <Button type={"submit"}><LoadingOverlay visible={isLoading}/>Dodaj książkę</Button>
        </Group>

      </form>
    </Modal>
  )
}