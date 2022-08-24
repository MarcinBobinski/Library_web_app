import React, {useEffect, useState} from "react";
import {AuthStore} from "../../../../store/AuthStore";
import {Group, Modal, PasswordInput, Button, TextInput, LoadingOverlay} from "@mantine/core";
import {useForm} from "@mantine/form";
import {showNotification} from "@mantine/notifications";
import {IconX} from "@tabler/icons";

type LoginModalProps = {
  opened: boolean,
  setOpened: (opened: boolean) => void;
  authStore: AuthStore
}

export const LoginModal = ({opened, setOpened, authStore}: LoginModalProps) => {
  const [isLoading, setLoading] = useState(false)

    const form = useForm({
      initialValues: {
        login: '',
        password: ''
      },
      validate: {
        login: (value) => (value.length == 0 ? 'Login nie może być pusty' : null),
        password: (value) => (value.length == 0 ? 'Hasło nie może być puste' : null)
      }
    })

  useEffect(()=> {
    form.clearErrors()
  },[opened])

  const onSubmit = async ({login, password}: {login:string, password:string}) => {
    setLoading(true)
      const loginSuccessful = await authStore.login(login, password);
      if (loginSuccessful) {
        setOpened(false);
      } else {
        showNotification({
          icon: <IconX size={18}/>,
          title: 'Błąd logowania',
          message: 'Z nieznanych przyczyn logowanie się nie powiodło, prosimy spróbować ponownie.',
          color: 'red',
          autoClose: 5000
        })
      }
      setLoading(false)
  }

  return (
    <Modal opened={opened} onClose={() => {setOpened(false)}} title={"Zaloguj się"}  centered={true}>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          label="Login"
          placeholder="Login"
          {...form.getInputProps('login')}
        />

        <PasswordInput
          mt={"md"}
          label="Hasło"
          placeholder="Hasło"
          {...form.getInputProps('password')}
        />


        <Group position={"center"} mt={"md"}>
          <Button type={"submit"}><LoadingOverlay visible={isLoading}/>Zaloguj</Button>
        </Group>
      </form>
    </Modal>
  )
}