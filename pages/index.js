//NEXT
import Head from "next/head";

//GENERALS
import { ParallaxBanner } from "react-scroll-parallax";

//COMPONENTS
import Carousel from "../components/Carousel";
import CardBooking from "../components/CardBooking";
import Services from "../components/services";
import GalleryMasonry from "../components/GalleryMasonry";
import LocationMap from "../components/LocationMap";
import Masonry from "../components/Masonry";

//STYLES
import styles from "../styles/pages/Home.module.scss";

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Casa Giardino</title>
      </Head>
      <div className={styles.carousel}>
        <Carousel />
      </div>
      <div className={styles.cardBookingContainer}>
        <CardBooking />
      </div>
      <div className={styles.services}>
        <Services />
      </div>
      <div className={styles.homeDetails}>
        <GalleryMasonry />
      </div>
      <div className={styles.locationMap}>
        <LocationMap />
      </div>
      <div className={styles.parallax}>
        <ParallaxBanner
          style={{
            height: "100vh",
          }}
          layers={[
            {
              image:
                "https://www.giovannicarrieri.com/photography/italy/ostuni/ostuni-via-panoramica.jpg",
              speed: -15,
            },
          ]}
          className="aspect-[2/1]"
        />
      </div>
      <div className={styles.masonry}>
        <Masonry />
      </div>
    </div>
  );
};

export default Home;
