//NEXT
import Link from "next/link";
import Image from "next/image";
//LOGO
import Logo from "../assets/img/Logo.svg";
import Booking from "../assets/icon/booking.svg";
//STYLES
import styles from "./styles/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.logoContainer}>
        <Logo/>
      </div>
      <div className={styles.logoContainer}>
        <div className="mr-2">Seguici su</div>
        <Link href="https://www.booking.com/hotel/it/casa-giardino-ostuni.it.html?label=gen173nr-1DCAsocUIUY2FzYS1naWFyZGluby1vc3R1bmlIFFgEaHGIAQGYARS4ARjIAQzYAQPoAQH4AQOIAgGoAgS4AuTemZUGwAIB0gIkMTM3ODRhNzEtZTU0YS00NmQyLTlhOWYtYWY1ZWQ3Yjk4Yjdj2AIE4AIB&sid=da8262ce59b68b8eff4d0c889f6789c0&dist=0&keep_landing=1&sb_price_type=total&type=total&">
          <a>
            <Booking />
          </a>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
