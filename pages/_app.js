//REACT
import {useRouter} from "next/router";
//PARALLAX
import { ParallaxProvider } from "react-scroll-parallax";
//PRIME REACT
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "/node_modules/primeflex/primeflex.css";
//FONTAWESOME
import "@fortawesome/fontawesome-svg-core/styles.css";
//PERSONALIZED THEME
import "/assets/scss/themes/theme.scss";
import "../styles/globals.css";
//COMPONENTS
import Header from "../components/Header";
import Footer from "../components/Footer";

require(`/assets/scss/${process.env.NEXT_PUBLIC_THEME}/color.css`);

function MyApp({ Component, pageProps }) {
    const router = useRouter();
  return (
    <ParallaxProvider>
        {router.pathname !== '/success-payment' && <Header />}
      <Component {...pageProps} />
        {router.pathname !== '/success-payment' && <Footer />}
    </ParallaxProvider>
  );
}

export default MyApp;
