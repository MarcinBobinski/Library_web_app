import React, {useEffect, useState} from "react";
import {AuthStore} from "../../../../store/AuthStore";
import {Group, Modal, PasswordInput, Button, TextInput, LoadingOverlay} from "@mantine/core";
import {useForm} from "@mantine/form";
import {showNotification} from "@mantine/notifications";
import {IconCheck, IconX} from "@tabler/icons";

type RegisterModalProps = {
  opened: boolean,
  setOpened: (opened: boolean) => void;
  authStore: AuthStore
}

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const RegisterModal = ({opened, setOpened, authStore}: RegisterModalProps) => {
  const [isLoading, setLoading] = useState(false)

  String("")
    .toLowerCase()
    .match(emailRegex);

  const form = useForm({
    initialValues: {
      email: '',
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validate: {
      email: (value) => (
        !String(value).toLowerCase().match(emailRegex) ? 'Nieprawidłowy Email' : null
      ),
      username: (value) => (
        value.length < 3 ? 'Login musi mieć minimum 3 znaki' :
          value.length > 20 ? 'Login może mieć maksymalnie 20 znaków' :
            null
      ),
      password: (value, values) => (
        value.length == 0 ? 'Hasło nie może być puste' :
          value != values.passwordConfirmation ? 'Hasła muszą być identyczne' :
            null
      ),
      passwordConfirmation: (value, values) => (
        value.length == 0 ? 'Hasło nie może być puste' :
          value != values.password ? 'Hasła muszą być identyczne' : null
      )
    }
  })

  useEffect(() => {
    form.clearErrors()
  }, [opened])

  const onSubmit = async ({
                            email,
                            username,
                            password,
                            passwordConfirmation
                          }: { email: string, username: string, password: string, passwordConfirmation: string }) => {
    setLoading(true)
    try {
      await authStore.registerUser(username, email, password);
      setOpened(false);
      showNotification({
        icon: <IconCheck size={18}/>,
        title: "Pomyślna rejestracja !",
        message: "Restacji zakończona sukcesem",
        color: 'green',
        autoClose: 5000
      })
    } catch (e){
      const errorMessage = e instanceof Error ? e.message : "Wystąpił nieznany błąd podczas rejestracji."
      showNotification({
        icon: <IconX size={18}/>,
        title: 'Błąd rejestracji',
        message: errorMessage,
        color: 'red',
        autoClose: 5000
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal opened={opened} onClose={() => {
      setOpened(false)
    }} title={"Zaloguj się"} centered={true}>
      <form onSubmit={form.onSubmit(onSubmit)}>

        <TextInput
          label="Email"
          placeholder="Email"
          {...form.getInputProps('email')}
        />

        <TextInput
          mt={"md"}
          label="Login"
          placeholder="Login"
          {...form.getInputProps('username')}
        />

        <PasswordInput
          mt={"md"}
          label="Hasło"
          placeholder="Hasło"
          {...form.getInputProps('password')}
        />

        <PasswordInput
          mt={"md"}
          label="Powtórz hasło"
          placeholder="Powtórz hasło"
          {...form.getInputProps('passwordConfirmation')}
        />

        <Group position={"center"} mt={"md"}>
          <Button type={"submit"}><LoadingOverlay visible={isLoading}/>Zarejestruj</Button>
        </Group>
      </form>
    </Modal>
  )
}