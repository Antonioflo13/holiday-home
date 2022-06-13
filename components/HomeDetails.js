//REACT
import { useState } from "react";
import { Parallax } from "react-scroll-parallax";
//COMPONENTS
import DialogGallery from "./DialogGallery";
//IMAGES
import image1 from "/assets/img/carouselImages/img1.jpeg";
import image2 from "/assets/img/carouselImages/img2.jpeg";
import image3 from "/assets/img/carouselImages/img3.jpeg";
import image4 from "/assets/img/carouselImages/img4.jpeg";
import image5 from "/assets/img/carouselImages/img5.jpeg";
import image6 from "/assets/img/carouselImages/img6.jpeg";
import image7 from "/assets/img/carouselImages/img7.jpeg";
import image8 from "/assets/img/carouselImages/img8.jpeg";
import image9 from "/assets/img/carouselImages/img9.jpeg";
//STYLES
import style from "./styles/GalleryMasonry.module.scss";

const Masonry = () => {
  const [openDialogGallery, setOpenDialogGallery] = useState(false);
  const [index, setIndex] = useState(0);
  const images = [
    {
      id: "1",
      url: image1,
      size: "lg",
    },
    {
      id: "2",
      url: image2,
    },
    {
      id: "3",
      url: image3,
    },
    {
      id: "4",
      url: image4,
    },
    {
      id: "5",
      url: image5,
    },
    {
      id: "6",
      url: image6,
    },
    {
      id: "7",
      url: image7,
    },
    {
      id: "8",
      url: image8,
    },
    {
      id: "9",
      url: image9,
    },
  ];
  //FUNCTIONS
  const doOpenDialogGallery = (index) => {
    setOpenDialogGallery(true);
    setIndex(index);
  };
  const closeDialogGallery = () => {
    setOpenDialogGallery(false);
  };

  return (
    <div className={style.container}>
      <DialogGallery
        openDialogGallery={openDialogGallery}
        closeDialogGallery={closeDialogGallery}
        index={index}
      />
      {images.map((image, index) => (
        <div
          className={`${image.size === "lg" ? style.gridCol2 : ""} `}
          key={image.id}
        >
          <Parallax translateY={[-1, 1]} opacity={[-1, 10]} speed={5}>
            <img
              className={style.img}
              src={`${image.url.src}`}
              alt={`${image.url.src}`}
              onClick={() => doOpenDialogGallery(index)}
            />
          </Parallax>
        </div>
      ))}
    </div>
  );
};

export default Masonry;
