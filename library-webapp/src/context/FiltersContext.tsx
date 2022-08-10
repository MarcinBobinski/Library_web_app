import React, {useContext} from "react";

export interface Filters{
  fromYear: number | null
  toYear: number | null
  categories: string[]
}

export type FiltersContent = {
  filters: Filters
  setFilters: (input: Filters) => void
  searchString: string
  setSearchString: (input: string) => void
}

export const FiltersContext = React.createContext<FiltersContent | null>(null)

interface FiltersProviderProps {
  children?: React.ReactNode
}

export const FiltersProvider = ({children}: FiltersProviderProps) => {
  const initFilters = {fromYear: null, toYear: null, categories: []}
  const setFiltersImpl = (input: Filters) => {

  }

  const initSearchString = ""
  const setSearchStringImpl = (input: string) => {

  }

  return (
    <FiltersContext.Provider value={null}>
  {children}
  </FiltersContext.Provider>
)
}

export const useSearchContext = () => {
  const context = useContext(FiltersContext)
  if (context == null) {
    throw new Error("Filters Context not provided")
  }
  return context
}
