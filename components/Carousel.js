//REACT
import {useState, useEffect} from "react";
//NEXT
import Image from "next/image";
//FIREBASE STORAGE
import { storage } from "../firebase-config";
import { ref, listAll, getDownloadURL } from "firebase/storage";
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
  const [listImages, setListImages] = useState([]);
  const imageRef = ref(storage, 'carousel/');
  useEffect(() => {
    listAll(imageRef).then(response => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setListImages((prev) => [...prev, {id: listImages.length ++,src:url, alt: `carousel-${listImages.length}`}]);
        })
      })
    })
  }, []);

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
      {listImages.map((image) => {
        return (
          <SplideSlide key={image.id}>
              <div className={styles.image}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      layout={'fill'}
                      objectFit='cover'
                      placeholder="blur"
                      blurDataURL={image.src}
                      quality={75}
                      priority={true}
                    />
              </div>
          </SplideSlide>
        );
      })}
    </Splide>
  );
};
export default Carousel;
