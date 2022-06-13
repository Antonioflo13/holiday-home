//NEXT
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
//PRIME REACT
import { Galleria } from "primereact/galleria";
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

const DialogGallery = (props) => {
  const { openDialogGallery, closeDialogGallery, index } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const galleria3 = useRef(null);

  const images = [
    {
      itemImageSrc: image1,
      thumbnailImageSrc: image1,
      title: "Ingresso",
    },
    {
      itemImageSrc: image2,
      thumbnailImageSrc: image2,
    },
    {
      itemImageSrc: image3,
      thumbnailImageSrc: image3,
    },
    {
      itemImageSrc: image4,
      thumbnailImageSrc: image4,
    },
    {
      itemImageSrc: image5,
      thumbnailImageSrc: image5,
    },
    {
      itemImageSrc: image6,
      thumbnailImageSrc: image6,
    },
    {
      itemImageSrc: image7,
      thumbnailImageSrc: image7,
    },
    {
      itemImageSrc: image8,
      thumbnailImageSrc: image8,
    },
    {
      itemImageSrc: image9,
      thumbnailImageSrc: image9,
    },
  ];

  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 5,
    },
    {
      breakpoint: "768px",
      numVisible: 3,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
    },
  ];

  useEffect(() => {
    if (openDialogGallery) {
      doOpenDialog();
    }
  }, [openDialogGallery]);

  //FUNCTIONS
  const doOpenDialog = () => {
    galleria3.current.show();
    setActiveIndex(index);
    closeDialogGallery();
  };

  //HTML RENDERS
  const itemTemplate = (item) => {
    return (
      <img
        src={item.itemImageSrc.src}
        alt={item.alt}
        style={{ width: "100%", display: "block" }}
      />
    );
  };

  const thumbnailTemplate = (item) => {
    return (
      <img
        src={item.thumbnailImageSrc}
        alt={item.alt}
        style={{ display: "block" }}
      />
    );
  };

  return (
    <Galleria
      ref={galleria3}
      value={images}
      responsiveOptions={responsiveOptions}
      numVisible={7}
      style={{ maxWidth: "850px" }}
      circular
      fullScreen
      showItemNavigators
      showThumbnails={false}
      activeIndex={activeIndex}
      onItemChange={(e) => setActiveIndex(e.index)}
      item={itemTemplate}
      thumbnail={thumbnailTemplate}
    />
  );
};

export default DialogGallery;
