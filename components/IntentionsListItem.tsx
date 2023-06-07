import {
  Chip,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import OutlinedFlagRoundedIcon from "@mui/icons-material/OutlinedFlagRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import React from "react";
import { IntentionType } from "@/types/intentionType";

export default function IntentionsListItem({
  children,
  intentionalElementType,
}: propTypes) {
  return (
    <ListItem>
      <ListItemIcon>
        {intentionalElementType === IntentionType.GOAL && (
          <OutlinedFlagRoundedIcon />
        )}
        {intentionalElementType === IntentionType.TASK && (
          <TaskAltRoundedIcon />
        )}
        {intentionalElementType === IntentionType.RESOURCE && (
          <Inventory2OutlinedIcon />
        )}
        {intentionalElementType === IntentionType.QUALITY && (
          <GppGoodOutlinedIcon />
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
  intentionalElementType: IntentionType;
};
