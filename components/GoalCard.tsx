import {
  ConnectionType,
  IntentionalElementType,
} from "@/types/intentionalElementType";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Avatar,
  CardContent,
  CardHeader,
  Collapse,
  List,
  Tooltip,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";

import ConnectionTypeText from "./ConnectionTypeText";
import ElevatedCard from "./ElevatedCard";
import ExpandMoreButton from "./ExpandMoreButton";
import GoalListItem from "./GoalListItem";

export default function GoalCard({
  intentionalElementType,
  connectionType,
}: propTypes) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <ElevatedCard>
      <CardHeader
        avatar={
          <Tooltip title="Goal: a state of affairs that the actor wants to achieve and that has clear-cut criteria of achievement.">
            <Avatar sx={{ bgcolor: red[400] }} aria-label="recipe">
              G
            </Avatar>
          </Tooltip>
        }
        title="Authorization obtained"
        subheader={intentionalElementType}
        action={
          // <Tooltip title={getActorTypeDescription(actorType)}>
          //   <IconButton>
          //     <InfoRoundedIcon />
          //   </IconButton>
          // </Tooltip>
          <ExpandMoreButton
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMoreButton>
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <ConnectionTypeText connectionType={connectionType} />
          <List>
            <GoalListItem intentionalElementType={IntentionalElementType.GOAL}>
              Goal 1
            </GoalListItem>
            <GoalListItem intentionalElementType={IntentionalElementType.GOAL}>
              Goal 2
            </GoalListItem>
            <GoalListItem intentionalElementType={IntentionalElementType.TASK}>
              Task 1
            </GoalListItem>
            <GoalListItem intentionalElementType={IntentionalElementType.TASK}>
              Task 2
            </GoalListItem>
          </List>
        </CardContent>
      </Collapse>
    </ElevatedCard>
  );
}

type propTypes = {
  intentionalElementType: IntentionalElementType;
  connectionType: ConnectionType;
};
