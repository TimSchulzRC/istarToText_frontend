import {
  Chip,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import OutlinedFlagRoundedIcon from "@mui/icons-material/OutlinedFlagRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import React from "react";
import { IntentionalElementType } from "@/types/intentionalElementType";

export default function IntentionalElementListItem({
  children,
  intentionalElementType,
}: propTypes) {
  return (
    <ListItem>
      <ListItemIcon>
        {intentionalElementType === IntentionalElementType.GOAL ? (
          <OutlinedFlagRoundedIcon />
        ) : (
          <TaskAltRoundedIcon />
        )}
      </ListItemIcon>
      <ListItemText>
        <Chip
          label={
            <Typography variant="h6" component="span">
              {children}
            </Typography>
          }
          onClick={() => {}}
        />
      </ListItemText>
    </ListItem>
  );
}

type propTypes = {
  children: string;
  intentionalElementType: IntentionalElementType;
};
