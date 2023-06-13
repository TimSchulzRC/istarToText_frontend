import Intention from "@/types/Intention";
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
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ListCard from "./cards/ListCard";
import { SelectedActorContext } from "./context/SelectedActorContext";
import {
  SelectedIntentionContext,
  SelectedIntentionDispatchContext,
} from "./context/SelectedIntentionContext";

export default function IntentionsList() {
  const selectedActor = React.useContext(SelectedActorContext);
  const selectedIntentionalElement = React.useContext(SelectedIntentionContext);
  const setSelectedIntentionalElement = React.useContext(
    SelectedIntentionDispatchContext
  );
  const qualities = getQualities();
  const onClickHandler = (element: Intention) => {
    selectedIntentionalElement === element
      ? setSelectedIntentionalElement(null)
      : setSelectedIntentionalElement(element);
  };
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (selectedIntentionalElement?.type.toLowerCase() === "quality") {
      setOpen(true);
    }
  }, [selectedIntentionalElement]);

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
      {qualities.length > 0 && (
        <>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <GppGood />
            </ListItemIcon>
            <ListItemText primary="Qualities" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {qualities.map((element) => (
                <ListItemButton
                  onClick={() => onClickHandler(element)}
                  key={uuidv4()}
                  selected={element.id === selectedIntentionalElement?.id}
                >
                  <ListItemText
                    primary={element.name}
                    secondary={element.type}
                  />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </>
      )}
      {selectedActor.elements.length === 0 && (
        <ListItem>
          <ListItemText primary="This actor has not intentions" />
        </ListItem>
      )}
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
