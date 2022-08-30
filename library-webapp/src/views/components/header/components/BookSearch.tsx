import React, {useEffect, useMemo, useState} from "react";
import {Group, Button, Autocomplete} from "@mantine/core";
import {observer} from "mobx-react";
import {useStore} from "../../../../store/store.context";
import {useDebouncedValue} from "@mantine/hooks";

type HintItem = {
  value: string
  id: number
}

const BookSearchView = () => {
  const { bookStore } = useStore()

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

  return (
    <Group>
      <Autocomplete value={value} onChange={setValue} data={hints}/>
    </Group>
  )
}

export const BookSearch = observer(BookSearchView)
