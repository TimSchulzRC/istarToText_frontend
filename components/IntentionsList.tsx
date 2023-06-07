import IntentionalElement from "@/types/IntentionalElement";
import {
  ExpandLess,
  ExpandMore,
  Flag,
  GppGood,
  Inventory,
  Task,
} from "@mui/icons-material";
import {
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import ListCard from "./cards/ListCard";
import { SelectedActorContext } from "./context/SelectedActorContext";
import {
  SelectedIntentionalElementContext,
  SelectedIntentionalElementDispatchContext,
} from "./context/SelectedIntentionalElementContext";

export default function IntentionsList() {
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

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <ListCard title="Intensions">
      {getAllButQualities().map((element) => (
        <ListItemButton
          onClick={() => onClickHandler(element)}
          key={uuidv4()}
          selected={element.id === selectedIntentionalElement?.id}
        >
          <ListItemIcon>
            {element.type.toLowerCase() === "goal" && <Flag />}
            {element.type.toLowerCase() === "task" && <Task />}
            {element.type.toLowerCase() === "resource" && <Inventory />}
          </ListItemIcon>
          <ListItemText primary={element.name} secondary={element.type} />
        </ListItemButton>
      ))}
      <Divider />
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <GppGood />
        </ListItemIcon>
        <ListItemText primary="Qualities" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {getQualities().map((element) => (
            <ListItemButton
              onClick={() => onClickHandler(element)}
              key={uuidv4()}
              selected={element.id === selectedIntentionalElement?.id}
            >
              <ListItemText primary={element.name} secondary={element.type} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </ListCard>
  );

  function getQualities() {
    return selectedActor.elements.filter(
      (element) => element.type.toLowerCase() === "quality"
    );
  }

  function getAllButQualities() {
    return selectedActor.elements.filter(
      (element) => element.type.toLowerCase() !== "quality"
    );
  }
}
