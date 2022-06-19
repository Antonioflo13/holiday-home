//REACT
import { useState, useEffect } from "react";
import { Parallax } from "react-scroll-parallax";
//FIREBASE STORAGE
import {storage} from "../firebase-config";
import {ref, listAll, getDownloadURL} from "firebase/storage";

//COMPONENTS
import DialogGallery from "./DialogGallery";
//STYLES
import style from "./styles/GalleryMasonry.module.scss";

const Masonry = () => {
  const [openDialogGallery, setOpenDialogGallery] = useState(false);
  const [index, setIndex] = useState(0);
  const [listImages, setListImages] = useState([]);
  const imageRef = ref(storage, 'gallery-masonry/');
  useEffect(() => {
    listAll(imageRef).then(response => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setListImages((prev) => [...prev, {
            id: listImages.length++,
            size: listImages.length === 1 ? 'lg' : '',
            src: url,
            alt: `gallery-masonry-${listImages.length}`
          }]);
        })
      })
    })
  }, []);
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
      {listImages.map((image, index) => (
        <div
          className={`${image.size === "lg" ? style.gridCol2 : ""} `}
          key={image.id}
        >
          <Parallax translateY={[-1, 1]} opacity={[-1, 10]} speed={5}>
            <img
              className={style.img}
              src={image.src}
              alt={image.alt}
              onClick={() => doOpenDialogGallery(index)}
            />
          </Parallax>
        </div>
      ))}
    </div>
  );
};

export default Masonry;
