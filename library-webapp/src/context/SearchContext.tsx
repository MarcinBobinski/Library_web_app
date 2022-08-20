import React, {useContext} from "react";

export type SearchContent = {
  searchString: string
  setSearchString: (input: string) => void
}

export const SearchContext = React.createContext<SearchContent | null>(null)

interface SearchProviderProps {
  children?: React.ReactNode
}

export const SearchProvider = ({children}: SearchProviderProps) => {
  const [searchString, setSearchString] = React.useState<string>("")

  return (
    <SearchContext.Provider value={{searchString, setSearchString}}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearchContext = () => {
  const context = useContext(SearchContext)
  if (context == null) {
    throw new Error("Search Context not provided")
  }
  return context
}
