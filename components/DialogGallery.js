//NEXT
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
//FIREBASE STORAGE
import {storage} from "../firebase-config";
import {ref, listAll, getDownloadURL} from "firebase/storage";
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
  const [listImages, setListImages] = useState([]);
  const galleria3 = useRef(null);
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

  const imageRef = ref(storage, 'gallery/');
  useEffect(() => {
    listAll(imageRef).then(response => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setListImages((prev) => [...prev, {
            id: listImages.length++,
            size: listImages.length % 4 ? 'lg' : '',
            src: url,
            alt: `dialog-gallery-${listImages.length}`
          }]);
        })
      })
    })
  }, []);

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
        src={item.src}
        alt={item.alt}
        style={{ width: "100%", display: "block" }}
      />
    );
  };

  const thumbnailTemplate = (item) => {
    return (
      <img
        src={item.src}
        alt={item.alt}
        style={{ display: "block" }}
      />
    );
  };

  return (
    <Galleria
      ref={galleria3}
      value={listImages}
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
