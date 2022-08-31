import React, {useEffect, useMemo, useState} from "react";
import {Group, Button, Autocomplete, AutocompleteItem, Text} from "@mantine/core";
import {observer} from "mobx-react";
import {useStore} from "../../../../store/store.context";
import {getHotkeyHandler, useDebouncedValue} from "@mantine/hooks";
import {useNavigate} from "react-router-dom";
import {IconSearch} from "@tabler/icons";

type HintItem = {
  value: string
  id: number
}

const BookSearchView = () => {
  const { bookStore } = useStore()
  const navigate = useNavigate()

  const [value, setValue] = useState('');
  const [hints, setHints] = useState([] as HintItem[]);
  const [debounced] = useDebouncedValue(value, 200);

  useEffect(()=> {
    bookStore.findBooksByTitle(debounced)
      .then((items) => items.map((item) =>
      {
        return {
          value: item.title,
          id: item.id
        } as HintItem
      }))
      .then((items) => {setHints(items)})
  },[debounced])

  const onItemSubmit = (item: HintItem) => {
    navigate(`/book/${item.id}`)
  }

  const onNotItemSubmit = ()=>{
    console.log("Not implemented yet")
  }

  return (
    <Group>
      <Autocomplete
        value={value}
        onChange={setValue}
        data={hints}
        onItemSubmit={onItemSubmit}
        radius={"md"}
        rightSection={<IconSearch onClick={onNotItemSubmit} size={15} />}
        onKeyUp={
          getHotkeyHandler([
            ['Enter', onNotItemSubmit]
          ])
        }
      />
    </Group>
  )
}

export const BookSearch = observer(BookSearchView)
