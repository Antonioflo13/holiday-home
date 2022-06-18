//REACT
import {useState, useEffect} from "react";
//FIREBASE
import {storage} from "../firebase-config";
import {ref, listAll, getDownloadURL} from "firebase/storage";
//PARALLAX
import {Parallax, ParallaxProvider} from "react-scroll-parallax";
//STYLES
import style from "./styles/masonry.module.scss";

const Masonry = () => {
    const [listImages, setListImages] = useState([]);
    const imageRef = ref(storage, 'carousel/');
    useEffect(() => {
        listAll(imageRef).then(response => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setListImages((prev) => [...prev, {
                        id: listImages.length++,
                        size: listImages.length % 4 ? 'lg' : '',
                        src: url,
                        alt: `masonry-${listImages.length}`
                    }]);
                })
            })
        })
    }, []);

    return (
        <div className={style.container}>
            {listImages.map((image) => (
                <div
                    className={`${
                        image.size === "lg" ? style.span2x : style.span1x
                    } `}
                    key={image.id}
                >
                    <ParallaxProvider>
                        <Parallax translateY={[-1, 1]} opacity={[-1, 10]} speed={5}>
                            <div className={style.imgContainer}>
                                <div>#CasaGiardino</div>
                                <img
                                    className={style.img}
                                    src={image.src}
                                    alt={image.alt}
                                />
                            </div>
                        </Parallax>
                    </ParallaxProvider>
                </div>
            ))}
        </div>
    );
};

export default Masonry;
