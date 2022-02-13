import type { AppProps } from 'next/app'
import { Provider } from 'mobx-react';
import Header from '../components/layout/Header';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Provider>
        <Header />
        <Component {...pageProps} />
      </Provider>
  )
}

export default MyApp
