import Layout from '../components/Layout';
import '../styles/globals.css';
import Head from 'next/head';

function MyApp({Component, pageProps}) {
  return (
    <div>
      <Head>
        <title>Entertainment App | In Demand Movies & TV Series</title>
        <link rel="shortcut icon" href="./assets/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

export default MyApp;
