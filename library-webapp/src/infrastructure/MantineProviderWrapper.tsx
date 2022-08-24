import React from 'react';
import {MantineProvider, ColorSchemeProvider, ColorScheme} from '@mantine/core';
import {NotificationsProvider} from '@mantine/notifications';
import {useHotkeys, useLocalStorage} from "@mantine/hooks";

type MantineProviderWrapperProps = {
  children?: React.ReactNode
}

export const MantineProviderWrapper = ({children}: MantineProviderWrapperProps) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{colorScheme}} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider limit={5} position={"top-right"}>
          {children}
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}