import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import React from "react";
import { IntentionalElementType } from "@/types/intentionalElementType";
import { type } from "os";

export default function GoalListItem({
  children,
  intentionalElementType,
}: propTypes) {
  return (
    <ListItem>
      <ListItemIcon>
        {intentionalElementType === IntentionalElementType.GOAL ? (
          <FlagRoundedIcon />
        ) : (
          <TaskAltRoundedIcon />
        )}
      </ListItemIcon>
      <ListItemText>
        {intentionalElementType}: {children}
      </ListItemText>
    </ListItem>
  );
}

type propTypes = {
  children: string;
  intentionalElementType: IntentionalElementType;
};
