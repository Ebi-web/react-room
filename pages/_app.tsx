/**
 * グローバルでtailwindを使えるようにした
 * https://nextjs.org/docs/messages/css-global
 */
import '../src/styles/tailwind.css'
import { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
