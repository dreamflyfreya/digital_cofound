import 'styles/globals.css'
import 'styles/tailwind.css'
import { ToastProvider } from '@apideck/components'
import { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  )
}
