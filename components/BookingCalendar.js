import React, {useEffect, useState} from "react";
import {Calendar} from "primereact/calendar";
// import { addLocale } from "primereact/api";

const BookingCalendar = (props) => {
    const {confirmReservation, calendarNotAvaiableDates} = props;
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);

    let today = new Date();
    let invalidDates = calendarNotAvaiableDates
        ? calendarNotAvaiableDates
        : [today];

    useEffect(
        () => confirmReservation({checkIn, checkOut}),
        [checkIn, checkOut]
    );

    return (
        <div className="flex flex-column">
            <div className="flex mb-3">
                <div className="flex flex-column mr-2">
                    <label htmlFor="checkIn" style={{fontWeight: "bold"}}>
                        CHECK-IN
                    </label>
                    <Calendar
                        id="checkIn"
                        dateFormat="dd/mm/yy"
                        placeholder="Seleziona una data"
                        minDate={today}
                        readOnlyInput={true}
                        value={checkIn}
                        disabledDates={invalidDates}
                        disabled={checkOut}
                        showButtonBar
                        onChange={(e) => setCheckIn(e.value)}
                        numberOfMonths={1}
                    />
                </div>
                <div className="flex flex-column">
                    <label htmlFor="checkOut" style={{fontWeight: "bold"}}>
                        CHECK-OUT
                    </label>
                    <Calendar
                        id="checkOut"
                        dateFormat="dd/mm/yy"
                        placeholder="Seleziona una data"
                        minDate={today && checkIn}
                        readOnlyInput={true}
                        value={checkOut}
                        disabled={!checkIn}
                        disabledDates={invalidDates}
                        showButtonBar
                        onChange={(e) => setCheckOut(e.value)}
                        numberOfMonths={1}
                    />
                </div>
            </div>
        </div>
    );
};

export default BookingCalendar;
