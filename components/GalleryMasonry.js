//REACT
import {useState, useEffect, useRef} from "react";
import {Parallax} from "react-scroll-parallax";
//FIREBASE STORAGE
import {storage} from "../firebase-config";
import {ref, listAll, getDownloadURL} from "firebase/storage";
//COMPONENTS
import {Galleria} from "primereact/galleria";
import {Card} from "primereact/card";
//STYLES
import styles from "./styles/GalleryMasonry.module.scss";

const GalleryMasonry = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [listImages, setListImages] = useState([]);
    const galleria3 = useRef(null);
    const imageRef = ref(storage, 'gallery/');
    useEffect(() => {
        listAll(imageRef).then(response => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setListImages((prev) => [...prev, {
                        numOrder: item.name,
                        id: ++listImages.length,
                        size: listImages.length % 4 ? 'lg' : '',
                        src: url,
                        alt: `gallery-masonry-${listImages.length}`
                    }]);
                })
            })
        })
    }, []);
    //HTML RENDERS
    const itemTemplate = (item) => {
        return (
            <img
                src={item.src}
                alt={item.alt}
                style={{width: "100vw", height: "60vh", objectFit: 'cover', display: "block"}}
            />
        );
    };

    const thumbnailTemplate = (item) => {
        return (
            <img
                src={item.src}
                alt={item.alt}
                style={{display: "block"}}
            />
        );
    };

    return (
        <Card title="Gallery" className={"shadow-8"}>
            <Galleria ref={galleria3} value={listImages} style={{maxWidth: '850px'}}
                      activeIndex={activeIndex} onItemChange={(e) => setActiveIndex(e.index)}
                      circular fullScreen showItemNavigators showThumbnails={false} item={itemTemplate}
                      thumbnail={thumbnailTemplate}/>

            <div className={styles.container}>
                {
                    listImages && listImages.sort((a, b) => a.numOrder.split('.')[0] - b.numOrder.split('.')[0]).map((image, index) => {
                        let imgEl = <img src={image.src} alt={image.alt} className={styles.img}
                                         onClick={
                                             () => {
                                                 setActiveIndex(index);
                                                 galleria3.current.show()
                                             }
                                         }/>

                        return (
                            <div className={`${image.size === 'lg' ? styles.gridCol2 : styles.gridRow2}`} key={index}>
                                {imgEl}
                            </div>
                        )
                    })
                }
            </div>
        </Card>
    );
};

export default GalleryMasonry;
