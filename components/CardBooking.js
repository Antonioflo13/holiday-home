//NEXT
import { useCallback, useEffect, useState } from "react";
//PRIME REACT
import { Card } from "primereact/card";
import { Button } from "primereact/button";
//GENERALS
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import moment from "moment";
//COMPONENTS
import BookingCalendar from "./BookingCalendar";
import DialogVisitors from "./DialogVisitors";
import DialogPayment from "./DialogPayment";
//STYLES
import styles from "./styles/CardBooking.module.scss";
import RedDoor from "/assets/icon/red-door.svg";

const CardBooking = () => {
  const [visitors, setVisitors] = useState([]);
  const [totalVisitors, setTotalVisitors] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogPayment, setOpenDialogPayment] = useState(false);
  const [reservationDates, setReservationDates] = useState(null);
  const [notAvailable, setNotAvailable] = useState(false);
  const [calendarNotAvailableDates, setCalendarNotAvailableDates] =
    useState(null);
  const [selectedDates, setSelectedDates] = useState(null);
  const [reservationRange, setReservationRange] = useState(null);
  const reservationsCollectionRef = collection(db, "reservations");

  useEffect(() => {
    let number = 0;
    visitors.forEach((visitor) => {
      number += visitor?.number;
    });
    setTotalVisitors(number);
  }, [visitors, setTotalVisitors]);

  useEffect(() => {
    getDates();
  }, []);

  const confirmVisitors = useCallback((adult, children, newborn) => {
    setVisitors([
      { type: "adult", number: adult },
      { type: "children", number: children },
      { type: "newborn", number: newborn },
    ]);
  }, []);
  //FUNCTIONS

  //Get reservation date by DB and set date in calendar and previous check for checkout payment
  const getDates = async () => {
    const data = await getDocs(reservationsCollectionRef);
    let reservations = [];
    let allNotAvailableDatesInMs = [];
    let notAvaible = [];
    const dayInMilliseconds = 86400000;

    data.docs.forEach((reservation) => {
      reservations.push([
        reservation.data().startReservation.seconds * 1000,
        reservation.data().endReservation.seconds * 1000,
      ]);
    });
    for (let reservation of reservations) {
      for (let index = reservation[0]; index <= reservation[1]; index++) {
        allNotAvailableDatesInMs.push((index += dayInMilliseconds));
        notAvaible.push(
          new Date(reservation[0]),
          new Date((index += dayInMilliseconds))
        );
      }
    }
    allNotAvailableDatesInMs.sort((a, b) => a - b);
    if (reservationDates) {
      checkAvailable(allNotAvailableDatesInMs);
    }
    setCalendarNotAvailableDates(notAvaible);
  };

  //Check dates available and calculate selected total reservations days
  const checkAvailable = (allNotAvailableDatesInMs) => {
    const checkIn = new Date(reservationDates.checkIn).setHours(0, 0, 0, 0);
    const checkOut = new Date(reservationDates.checkOut).setHours(0, 0, 0, 0);
    const dayInMilliseconds = 86400000;
    let reservationRange = (checkOut - checkIn) / dayInMilliseconds;
    setReservationRange(reservationRange + 1);

    const check = checkDates(checkIn, checkOut, allNotAvailableDatesInMs);
    if (!check) {
      setNotAvailable(false);
      setOpenDialogPayment(true);
      setSelectedDates({
        checkIn: new Date(checkIn).toLocaleDateString(),
        checkInMillisecond: checkIn,
        checkOut: new Date(checkOut).toLocaleDateString(),
        checkOutMillisecond: checkOut,
      });
    }
  };

  //Check selcted dates is between in DB
  const checkDates = (checkIn, checkOut, allNotAvailableDatesInMs) => {
    for (const allNotAvailableDateInMs of allNotAvailableDatesInMs) {
      if (moment(allNotAvailableDateInMs).isBetween(checkIn, checkOut)) {
        return true;
      }
    }
    return false;
  };

  const cleanSearch = () => {
    setVisitors([]);
    setTotalVisitors(null);
    setNotAvailable(null);
    setPrevNewCheckIn(null);
    setPrevNewCheckOut(null);
    setNextNewCheckIn(null);
    setNextNewCheckOut(null);
  };

  //HTML RENDERS
  const cardHeader = (
    <div className="flex justify-content-center align-items-center font-bold text-xl p-3">
      <div>Ehi, scegli le date per la tua prossima vacanza!</div>
      <RedDoor />
    </div>
  );

  const cardFooter = (
    <span>
      <Button
        style={{ width: "100%" }}
        onClick={getDates}
        disabled={
          !reservationDates?.checkIn ||
          !reservationDates?.checkOut ||
          visitors.length === 0
        }
        label={"Controlla la disponibilità"}
      />
    </span>
  );

  return (
    <div>
      <DialogVisitors
        totalVisitors={totalVisitors}
        openDialog={openDialog}
        confirmVisitors={confirmVisitors}
        onHide={() => setOpenDialog(false)}
      />
      <DialogPayment
        openDialogPayment={openDialogPayment}
        totalVisitors={totalVisitors}
        selectedDates={selectedDates}
        reservationRange={reservationRange}
        onHide={() => setOpenDialogPayment(false)}
      />
      <Card header={cardHeader} className="shadow-8" footer={cardFooter}>
        <div className={styles.card}>
          <BookingCalendar
            calendarnotAvailableDates={calendarNotAvailableDates}
            confirmReservation={(reservationDate) =>
              setReservationDates(reservationDate)
            }
          />
          {totalVisitors > 0 && (
            <div className="flex align-items-center py-2">
              <div className="w-full">{`${
                totalVisitors === 1
                  ? `${totalVisitors} ospite`
                  : `${totalVisitors} ospiti`
              }`}</div>
              <Button
                icon="pi pi-pencil"
                iconPos="right"
                label="Modifica"
                className="ml-2 p-button-text p-button-sm w-full"
                onClick={() => setOpenDialog(true)}
              />
            </div>
          )}
          {!totalVisitors && (
            <Button
              style={{ width: "100%" }}
              icon="pi pi-plus-circle"
              iconPos="right"
              label="Ospiti"
              className="my-3 p-button-outlined p-button-secondary"
              onClick={() => setOpenDialog(true)}
            />
          )}
          {notAvailable && (
            <div className="flex flex-column align-items-center">
              <div className="text-pink-700">
                Ci dispiace le date selezionate non sono disponibili.
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CardBooking;
