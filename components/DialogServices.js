//REACT
import { useEffect, useState } from "react";
//COMPONENTS
import { Dialog } from "primereact/dialog";
//ICONS
import Garden from "../assets/icon/garden.svg";
import Sea from "../assets/icon/sea.svg";
import HairDryer from "../assets/icon/hair-dryer.svg";
import Shower from "../assets/icon/shower.svg";
import Soap from "../assets/icon/liquid-soap.svg";
import WashProduct from "../assets/icon/wash.svg";
import WashingMachine from "../assets/icon/washing-machine.svg";
import Water from "../assets/icon/waterdrop.svg";
import Towel from "../assets/icon/towel-hanger.svg";
import Hanger from "../assets/icon/hanger.svg";
import Bedding from "../assets/icon/washing.svg";
import Wardrobe from "../assets/icon/wardrobe.svg";
import Wifi from "../assets/icon/wifi.svg";
import Tv from "../assets/icon/tv-screen.svg";
import Crib from "../assets/icon/baby-crib.svg";
import AirConditioner from "../assets/icon/air-conditioner.svg";
import Oven from "../assets/icon/oven2.svg";
import Fridge from "../assets/icon/fridge.svg";
import Kitchen from "../assets/icon/kitchen.svg";
import Pan from "../assets/icon/pan.svg";
import Cutlery from "../assets/icon/cutlery.svg";
import CoffeeMaker from "../assets/icon/coffee-maker.svg";
import DiningTable from "../assets/icon/dining-table.svg";
import Handle from "../assets/icon/handle.svg";
import OldTown from "../assets/icon/old-town.svg";
import Courtyard from "../assets/icon/courtyard.svg";
import Picnic from "../assets/icon/picnic.svg";
import Tanningnic from "../assets/icon/tanning.svg";

const DialogVisitors = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const services = [
    {
      category: "Viste Paronamiche",
      type: [
        {
          icon: <Sea />,
          text: "Vista mare",
        },
        {
          icon: <Garden />,
          text: "Vista giardino",
        },
      ],
    },
    {
      category: "Bagno",
      type: [
        {
          icon: <Shower />,
          text: "Doccia",
        },
        {
          icon: <HairDryer />,
          text: "Ascigacapelli",
        },
        {
          icon: <WashProduct />,
          text: "Prodotti per la pulizia",
        },
        {
          icon: <Soap />,
          text: "Sapone corpo",
        },
        {
          icon: <Soap />,
          text: "Shampoo",
        },
        {
          icon: <Water />,
          text: "Acqua calda",
        },
      ],
    },
    {
      category: "Camera da letto e lavanderia",
      type: [
        {
          icon: <WashingMachine />,
          text: "Lavatrice",
        },
        {
          icon: <Towel />,
          text: "Essenziali",
          subtext: "Ascigamani, lenzuola, carta igenica",
        },
        {
          icon: <Hanger />,
          text: "Grucce",
        },
        {
          icon: <Bedding />,
          text: "Biancheria da letto",
        },
        {
          icon: <Wardrobe />,
          text: "Spazio per conservare l'abbigliamento",
        },
      ],
    },
    {
      category: "Intrattenimento",
      type: [
        {
          icon: <Wifi />,
          text: "Wi-Fi",
        },
        {
          icon: <Tv />,
          text: "TV",
        },
      ],
    },
    {
      category: "Famiglia",
      type: [
        {
          icon: <Crib />,
          text: "Culla",
        },
      ],
    },
    {
      category: "Riscsaldamento e climatizzazione",
      type: [
        {
          icon: <AirConditioner />,
          text: "Aria condizionata",
        },
      ],
    },
    {
      category: "Cucina e zona pranzo",
      type: [
        {
          icon: <Kitchen />,
          text: "Cucina",
          subtext: "Uno spazio in cui gli ospiti possono cucinare",
        },
        {
          icon: <Fridge />,
          text: "Frigorifero",
        },
        {
          icon: <Oven />,
          text: "Forno",
        },
        {
          icon: <Pan />,
          text: "Servizi di base per cucinare",
          subtext: "Pentole, padelle, ecc..",
        },
        {
          icon: <Cutlery />,
          text: "Piatti e posate",
          subtext: "Scodelle, piatti, tazze, ecc..",
        },
        {
          icon: <CoffeeMaker />,
          text: "Macchina caaffe",
        },
        {
          icon: <DiningTable />,
          text: "Tavolo da pranzo",
        },
      ],
    },
    {
      category: "Caratteristiche della posizione",
      type: [
        {
          icon: <Handle />,
          text: "Ingresso privato",
        },
        {
          icon: <OldTown />,
          text: "Centro storico",
        },
      ],
    },
    {
      category: "All'aperto",
      type: [
        {
          icon: <Picnic />,
          text: "Zona pranzo all'aperto",
        },
        {
          icon: <Tanningnic />,
          text: "Solarium",
        },
        {
          icon: <Picnic />,
          text: "Terrazza",
        },
        {
          icon: <Garden />,
          text: "Giardino",
        },
        {
          icon: <Courtyard />,
          text: "Cortile privato",
        },
      ],
    },
  ];

  useEffect(() => setOpenDialog(props.openDialog), [props.openDialog]);
  //FUNCTIONS
  const onHide = () => {
    props.onHide();
    setOpenDialog(false);
  };

  return (
    <Dialog
      header="Cosa troverai"
      visible={openDialog}
      style={{ width: "70vw" }}
      breakpoints={{ "960px": "75vw" }}
      onHide={onHide}
    >
      {services.map((service) => (
        <div key={service} className="mb-5">
          <div className="font-bold text-xl mb-5">{service.category}</div>
          {service.type.map((type) => (
            <div
              key={service.type}
              className="flex align-items-center mt-4 border-bottom-1 border-300"
            >
              <span className="mr-2">{type.icon}</span>
              <div className="mb-2">
                <div className="font-bold">{type.text}</div>
                <div className="text-sm">{type.subtext}</div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </Dialog>
  );
};

export default DialogVisitors;
