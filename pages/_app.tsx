import Head from 'next/head'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../redux'
import '../styles/globals.css'



export default function MyApp({ Component, pageProps }) {
    return <>
        <Head>

            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width" />
            <meta name="description" content="A historical person guessing-game. Like wordle" />
            <meta name="keywords" content="history, wordle, guessing, game, historical person" />
            <meta name="author" content="Atticus Kuhn" />
            <meta property="og:title" content="Historcle - a history guessing game" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="./images/peel.jpg" />
            <meta property="og:url" content="https://atticuskuhn.github.io/historcle/" />
            <link rel="icon" type="image/x-icon" href="./images/peel.jpg" />

            <title>Historcle</title>
            <link href="style.css" rel="stylesheet" type="text/css" />
        </Head>
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    </>
}