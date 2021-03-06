//REACT
import {useCallback, useEffect, useState} from "react";
import {Dialog} from "primereact/dialog";
//COMPONENTS
import Counter from "./Counter";
import DialogVisitorsFooter from "./DialogVisitorsFooter";
//STYLES
import style from "./styles/DialogVisitors.module.scss";

const DialogVisitors = (props) => {
    const {confirmVisitors} = props;
    const [openDialog, setOpenDialog] = useState(false);
    const [adult, setAdult] = useState(0);
    const [children, setChildren] = useState(0);
    const [newborn, setNewborn] = useState(0);
    const [totalVisitors, setTotalVisitors] = useState(0);
    const visitorsTypes = [
        {
            id: 1,
            type: "Adulti",
            description: "Più di 13 anni",
        },
        {
            id: 2,
            type: "Bambini",
            description: "Età 2 - 12 ",
        },
        {
            id: 3,
            type: "Neonati",
            description: "Fino a 2 anni",
        },
    ];
    useEffect(() => {
        setOpenDialog(props.openDialog)
    }, [props.openDialog]);

    useEffect(
        () => {
            setTotalVisitors(adult + children + newborn);
        },
        [adult, children, newborn]
    );
    const handlerVisitors = useCallback((type, number) => {
        switch (type) {
            case 1:
                setAdult(number);
                break;
            case 2:
                setChildren(number);
                break;
            case 3:
                setNewborn(number);
                break;
            default:
                console.log("there are no selected");
                break;
        }
    }, []);
    //FUNCTIONS
    const visitors = () => {
        confirmVisitors(adult, children, newborn);
        setTotalVisitors(0);
        onHide();
    };

    const onHide = () => {
        props.onHide();
        setOpenDialog(false);
    };

    return (
        <Dialog
            header="Ospiti"
            visible={openDialog}
            style={{width: "30vw"}}
            breakpoints={{"960px": "75vw", "768px": "95vw"}}
            footer={DialogVisitorsFooter}
            onHide={onHide}
            confirmVisitors={visitors}
        >
            <div className="flex flex-column">
                {visitorsTypes.map((visitorType) => (
                    <div
                        key={visitorType.id}
                        className="flex align-items-center justify-content-between mb-4"
                    >
                        <div className="flex flex-column">
                            <div className={style.bold}>{visitorType.type}</div>
                            <div className="text-sm text-500">{visitorType.description}</div>
                        </div>
                        <Counter
                            setVisitors={(number) => handlerVisitors(visitorType.id, number)}
                            totalVisitors={totalVisitors}
                        />
                    </div>
                ))}
            </div>
        </Dialog>
    );
};

export default DialogVisitors;
