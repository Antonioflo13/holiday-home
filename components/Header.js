//NEXT
import Image from "next/image";
//LOGO
import Logo from "../assets/img/Logo.svg";
//STYLES
import styles from "./styles/Header.module.scss";

const Header = () => {
  return (
    <header>
      <div className={styles.container}>
        <Logo/>
      </div>
    </header>
  );
};

export default Header;
