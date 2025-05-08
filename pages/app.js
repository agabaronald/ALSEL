import '../styles/globals.css';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  // Ensure the dark theme is applied by default
  if (typeof window !== 'undefined') {
    document.body.classList.add('dark');
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;