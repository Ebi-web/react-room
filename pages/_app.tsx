/**
 * グローバルでtailwindを使えるようにした
 * https://nextjs.org/docs/messages/css-global
 */
import '../src/styles/tailwind.css'
import { AppProps } from 'next/app'

import { Provider } from 'react-redux'
import { store } from '../src/stores/store'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
