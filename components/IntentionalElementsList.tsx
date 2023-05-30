import React from "react";
import ListCard from "./cards/ListCard";
import { SelectedActorContext } from "./context/SelectedActorContext";
import { v4 as uuidv4 } from "uuid";
import { ListItemButton, ListItemText } from "@mui/material";
import IntentionalElement from "@/types/IntentionalElement";
import {
  SelectedIntentionalElementContext,
  SelectedIntentionalElementDispatchContext,
} from "./context/SelectedIntentionalElementContext";

export default function IntentionalElementsList() {
  const selectedActor = React.useContext(SelectedActorContext);
  const selectedIntentionalElement = React.useContext(
    SelectedIntentionalElementContext
  );
  const setSelectedIntentionalElement = React.useContext(
    SelectedIntentionalElementDispatchContext
  );
  const onClickHandler = (element: IntentionalElement) => {
    selectedIntentionalElement === element
      ? setSelectedIntentionalElement(null)
      : setSelectedIntentionalElement(element);
  };
  return (
    <ListCard title="Goals and Task">
      {selectedActor.elements.map((element) => (
        <ListItemButton
          onClick={() => onClickHandler(element)}
          key={uuidv4()}
          selected={element.id === selectedIntentionalElement?.id}
        >
          <ListItemText primary={element.name} secondary={element.type} />
        </ListItemButton>
      ))}
    </ListCard>
  );
}
