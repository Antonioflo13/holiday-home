//REACT
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
//FIREBASE
import {db} from "../firebase-config";
import {collection, getDocs} from "firebase/firestore";
//PRIMEREACT
import {Card} from "primereact/card";
import {Skeleton} from "primereact/skeleton";
//LOGO
import Logo from "../assets/img/Logo.svg";
//STYLES
import styles from "../styles/pages/SuccessPayment.module.scss";

const SuccessPayment = () => {
    const reservationsCollectionRef = collection(db, "reservations");
    const [client, setClient] = useState(null);
    const router = useRouter();
    useEffect(() => {
        getInfoClient(+router.query.sr / 1000, +router.query.er / 1000)
    }, [router.query.sr, router.query.er]);

    const getInfoClient = async (startReservation, endReservation) => {
        const data = await getDocs(reservationsCollectionRef);
        const infoClient = data.docs.find((reservation) => {
            return (
                reservation.data().startReservation.seconds === startReservation &&
                reservation.data().endReservation.seconds === endReservation
            );
        });
        setClient(infoClient?.data());
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
                            <Logo/>
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
