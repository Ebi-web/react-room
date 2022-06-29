/**
 * グローバルでtailwindを使えるようにした
 * https://nextjs.org/docs/messages/css-global
 */
import '../src/styles/tailwind.css'
import { AppProps } from 'next/app'

import { Provider } from 'react-redux'
import { store } from '../src/stores/store'
import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <MantineProvider>
        <NotificationsProvider>
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </Provider>
  )
}
