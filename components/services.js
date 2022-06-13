//REACT
import { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
//ICONS
import Oven from "../assets/icon/oven.svg";
import Garden from "../assets/icon/garden.svg";
import Courtyard from "../assets/icon/courtyard.svg";
import Sea from "../assets/icon/sea.svg";
import Home from "../assets/icon/home.svg";
//COMPONENTS
import DialogServices from "./DialogServices";
//STYLES
import styles from "./styles/Services.module.scss";
import React from "react";

const Services = () => {
  const [openDialog, setOpenDialog] = useState(false);

  //FUNCTIONS
  const onHide = () => setOpenDialog(false);

  //HTML RENDER
  const footer = (
    <div className="text-center">
      <Button
        label="Mostra altri servizi"
        className="p-button-sm p-button-outlined p-button-secondary"
        onClick={() => setOpenDialog(true)}
      />
    </div>
  );

  return (
    <React.Fragment>
      <DialogServices openDialog={openDialog} onHide={onHide} />
      <Card title="Cosa troverai" className={"shadow-8"} footer={footer}>
        <div className={styles.services}>
          <div className="flex align-items-center m-2">
            <Home className="mr-2" />
            <span>Intera casa</span>
          </div>
          <div className="flex align-items-center m-2">
            <Oven className="mr-2" />
            <span>Cucina</span>
          </div>
          <div className="flex align-items-center m-2">
            <Garden className="mr-2" />
            <span>Vista giardino</span>
          </div>
          <div className="flex align-items-center m-2">
            <Courtyard className="mr-2" />
            <span>Vista cortile interno</span>
          </div>
          <div className="flex align-items-center m-2">
            <Sea className="mr-2" />
            <span>Vista mare</span>
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default Services;
