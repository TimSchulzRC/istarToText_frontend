import Actor from "@/types/Actor";
import Intention from "@/types/Intention";
import { ActorType } from "@/types/actorType";
import { IntentionType } from "@/types/intentionType";
import { Chip, Paper, Popper } from "@mui/material";
import React from "react";
import DetailsScreen from "./DetailsScreen";
import { SelectedActorDispatchContext } from "./context/SelectedActorContext";
import { SelectedIntentionDispatchContext } from "./context/SelectedIntentionContext";

export default function LinkHoverChip({
  label,
  color,
  element,
}: {
  label: string | undefined;
  color?:
    | "default"
    | "warning"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success";
  element?: Intention | Actor;
}) {
  const setSelectedActor = React.useContext(SelectedActorDispatchContext);
  const setSelectedIntention = React.useContext(
    SelectedIntentionDispatchContext
  );
  const [showOverlay, setShowOverlay] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [delayHandler, setDelayHandler] = React.useState<null | NodeJS.Timeout>(
    null
  );
  return (
    <>
      <Chip
        component="span"
        label={label}
        color={color}
        size="small"
        onMouseEnter={(event) => {
          setDelayHandler(
            setTimeout(() => {
              console.log(element);

              console.log("hovering started");
              setAnchorEl(event.currentTarget);
              setShowOverlay(true);
            }, 500)
          );
        }}
        onMouseLeave={(event) => {
          clearTimeout(delayHandler as NodeJS.Timeout);
          console.log("hovering ended");
          setAnchorEl(null);
          setShowOverlay(false);
        }}
        onClick={() => {
          console.log(element);
          if (elementIsActor(element)) {
            setSelectedActor(element as Actor);
          }
          if (elementIsIntention(element)) {
            setSelectedIntention(element as Intention);
          }
        }}
      />
      <Popper
        sx={{ mt: 10, maxWidth: "50vw" }}
        open={showOverlay}
        onMouseEnter={(event) => {
          console.log("hovering started");
          setShowOverlay(true);
        }}
        onMouseLeave={(event) => {
          console.log("hovering ended");
          setShowOverlay(false);
        }}
      >
        <Paper elevation={10}>
          {elementIsActor(element) && (
            <DetailsScreen actor={element as Actor} />
          )}
          {elementIsIntention(element) && (
            <DetailsScreen intention={element as Intention} />
          )}
        </Paper>
      </Popper>
    </>
  );
}

function elementIsActor(element: Intention | Actor | undefined): boolean {
  return Object.values(ActorType).includes(element?.type as ActorType);
}

function elementIsIntention(element: Intention | Actor | undefined): boolean {
  return Object.values(IntentionType).includes(element?.type as IntentionType);
}
