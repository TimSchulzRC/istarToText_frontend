import { ArrowBack } from "@mui/icons-material";
import { AppBar, Container, IconButton, Toolbar } from "@mui/material";
import React from "react";
import ChipDescription from "./ChipDescription";
import {
  HistoryContext,
  PopHistoryItemContext,
} from "./context/HistoryContext";
import { SelectedActorDispatchContext } from "./context/SelectedActorContext";
import { SelectedIntentionDispatchContext } from "./context/SelectedIntentionContext";

export default function MenuBar() {
  const history = React.useContext(HistoryContext);
  const popHistoryItem = React.useContext(PopHistoryItemContext);
  const setSelectedActor = React.useContext(SelectedActorDispatchContext);
  const setSelectedIntention = React.useContext(
    SelectedIntentionDispatchContext
  );

  function handleBack() {
    const item = popHistoryItem();
    if (
      item?.type === "actor" ||
      item?.type === "role" ||
      item?.type === "agent"
    ) {
      setSelectedActor(item);
      setSelectedIntention(null);
    }
    if (
      item?.type === "goal" ||
      item?.type === "task" ||
      item?.type === "resource" ||
      item?.type === "quality"
    ) {
      setSelectedActor(item.actor);
      setSelectedIntention(item);
    }

    console.log("Popped item: ", item);
  }

  return (
    <AppBar color="default">
      <Toolbar>
        {history.length > 1 && (
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={handleBack}
          >
            <ArrowBack></ArrowBack>
          </IconButton>
        )}
        <Container maxWidth="xl">
          <ChipDescription />
        </Container>
      </Toolbar>
    </AppBar>
  );
}
