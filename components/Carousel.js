//NEXT
import Image from "next/image";
//CAROUSEL
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
//IMAGES
import image1 from "../assets/img/carouselImages/img1.jpeg";
import image2 from "../assets/img/carouselImages/img2.jpeg";
import image3 from "../assets/img/carouselImages/img3.jpeg";
import image4 from "../assets/img/carouselImages/img4.jpeg";
import image5 from "../assets/img/carouselImages/img5.jpeg";
import image6 from "../assets/img/carouselImages/img6.jpeg";
import image7 from "../assets/img/carouselImages/img7.jpeg";
import image8 from "../assets/img/carouselImages/img8.jpeg";
import image9 from "../assets/img/carouselImages/img9.jpeg";
//STYLES
import styles from "./styles/Carousel.module.scss";

const Carousel = () => {
  const images = [
    {
      id: "1",
      url: image1,
      position: "center",
    },
    {
      id: "2",
      url: image2,
      position: "center",
    },
    {
      id: "3",
      url: image3,
      position: "center",
    },
    {
      id: "4",
      url: image4,
      position: "center",
    },
    {
      id: "5",
      url: image5,
      position: "center",
    },
    {
      id: "6",
      url: image6,
      position: "center",
    },
    {
      id: "7",
      url: image7,
      position: "center",
    },
    {
      id: "8",
      url: image8,
      position: "center",
    },
    {
      id: "9",
      url: image9,
      position: "center",
    },
  ];
  return (
    <Splide
      options={{
        type: "fade",
        rewind: true,
        width: "100%",
        autoplay: true,
        resetProgress: true,
        interval: 4000,
        arrows: false,
        pagination: false,
      }}
    >
      {images.map((image) => {
        return (
          <SplideSlide key={image.id}>
            <img
              className={styles.image}
              objectPosition={image.position}
              src={`${image.url.src}`}
              alt={image.url.src}
            />
          </SplideSlide>
        );
      })}
    </Splide>
  );
};
export default Carousel;
