import Layout from '../components/Layout';
import '../css/style.css';
import { Provider } from 'next-auth/client';
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import '@fortawesome/fontawesome-svg-core/styles.css'; // import Font Awesome CSS
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider as StoreProvider } from 'react-redux';
import { store } from '../redux/store';

//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
    return (
        <StoreProvider store={store}>
            <Provider session={pageProps.session}>
                <Layout>
                    <Component {...pageProps} />
                    <ToastContainer
                        position='top-right'
                        autoClose={8000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        draggable={false}
                        pauseOnVisibilityChange
                        closeOnClick
                        pauseOnHover
                    />
                </Layout>
            </Provider>
        </StoreProvider>
    );
}

export default MyApp;
