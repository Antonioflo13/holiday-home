import { Button } from "primereact/button";

const DialogVisitorsFooter = (props) => {
  return (
    <div>
      <Button
        label="Conferma"
        icon="pi pi-check"
        className="p-button-sm"
        onClick={props.confirmVisitors}
      />
    </div>
  );
};

export default DialogVisitorsFooter;
