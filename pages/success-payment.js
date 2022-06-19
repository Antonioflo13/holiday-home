import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {db} from "../firebase-config";
import {collection, getDocs} from "firebase/firestore";

import {Card} from "primereact/card";
import {Skeleton} from "primereact/skeleton";

import Logo from "../assets/img/Logo.svg";
import styles from "../styles/pages/SuccessPayment.module.scss";

const SuccessPayment = () => {
    const reservationsCollectionRef = collection(db, "reservations");
    const [client, setClient] = useState(null);
    const router = useRouter();
    useEffect(() => {
        getInfoClient();
    }, []);

    const getInfoClient = async () => {
        let startReservation = Number(router.query.sr / 1000);
        let endReservation = Number(router.query.er / 1000);

        const data = await getDocs(reservationsCollectionRef);
        const infoClient = await data.docs.find((reservation) => {
            return (
                reservation.data().startReservation.seconds === startReservation &&
                reservation.data().endReservation.seconds === endReservation
            );
        });
        console.log(infoClient);
    };
    return (
        <div className={styles.bgMain}>
            <div className={styles.container}>
                <div className={styles.successPaymentCard}>
                    {!client && (
                        <Skeleton
                            className={styles.paymentCard}
                            width="100%"
                            height="40vh"
                        />
                    )}
                    {client && (
                        <Card className={styles.paymentCard}>
                            <img src={Logo} alt={Logo} className={styles.imageCard}/>
                            <div className={styles.titleCard}>
                                Ti Auguriamo Buone Vacanze!
                            </div>
                            <div className={styles.mainCard}>
                                <div>
                                    Grazie {client.fullName}! Il tuo soggiorno presso la struttura
                                    è confermato.
                                </div>
                                <div>
                                    A breve riceverai un'email di conferma all'indirizzo{" "}
                                    <span>{client.email}</span>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SuccessPayment;
