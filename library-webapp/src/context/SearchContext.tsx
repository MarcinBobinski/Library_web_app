import React, {useContext} from "react";

export type SearchContent = {
  searchString: String
  setSearchString: (input: string) => void
}

export const SearchContext = React.createContext<SearchContent | null>(null)

interface SearchProviderProps {
  children?: React.ReactNode
}

export const SearchProvider: React.FC<SearchProviderProps> = ({children}: SearchProviderProps) => {
  const [searchString, setSearchString] = React.useState<String>("")

  return (
    <SearchContext.Provider value={{searchString, setSearchString}}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearchContext = () => {
  const context = useContext(SearchContext)
  if (context == null) {
    // throw exception not in context
  }
  return context
}
