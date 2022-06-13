//NEXT
import Image from "next/image";
//LOGO
import Logo from "../assets/img/Logo.png";
//STYLES
import styles from "./styles/Header.module.scss";

const Header = () => {
  return (
    <header>
      <div className={styles.container}>
        <Image src={Logo.src} alt={Logo} width={100} height={100} />
      </div>
    </header>
  );
};

export default Header;
