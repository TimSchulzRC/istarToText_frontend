import {
  ConnectionType,
  IntentionalElementType,
} from "@/types/intentionalElementType";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Avatar,
  Box,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  List,
  Tooltip,
  Typography,
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import React from "react";

import ConnectionTypeText from "../ConnectionTypeText";
import ElevatedCard from "./ElevatedCard";
import ExpandMoreButton from "../ExpandMoreButton";
import IntentionalElementListItem from "../IntentionalElementListItem";
import IntentionalElement from "@/types/IntentionalElement";
import { v4 as uuidv4 } from "uuid";
import QualitiesText from "../QualitiesText";

export default function IntentionalElementCard({
  element: {
    children,
    parentConnection,
    type,
    name,
    childrenConnectionType,
    qualities,
  },
}: propTypes) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <ElevatedCard>
      <CardHeader
        // avatar={
        //   <Tooltip title="Goal: a state of affairs that the actor wants to achieve and that has clear-cut criteria of achievement.">
        //     <Avatar
        //       sx={{
        //         bgcolor:
        //           type === IntentionalElementType.GOAL ? red[400] : green[400],
        //       }}
        //       aria-label="recipe"
        //     >
        //       {type === IntentionalElementType.GOAL ? "G" : "T"}
        //     </Avatar>
        //   </Tooltip>
        // }
        title={name}
        subheader={type}
        action={
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
          {parentConnection && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="body1" component="span">
                This{" "}
                {parentConnection.type === ConnectionType.AND ? (
                  <>
                    {parentConnection.parent.type.toLowerCase()} is{" "}
                    <Typography variant="h6" component="span">
                      necessary
                    </Typography>
                  </>
                ) : (
                  <>
                    {parentConnection.parent.type} is{" "}
                    <Typography variant="h6" component="span">
                      one option
                    </Typography>
                  </>
                )}{" "}
                to{" "}
                {type === IntentionalElementType.GOAL ? "achieve" : "complete"}{" "}
                the {type.toLowerCase()}
              </Typography>{" "}
              <Chip label={parentConnection.parent.name} onClick={() => {}} />
            </Box>
          )}
          {children.length > 0 && childrenConnectionType && (
            <>
              <ConnectionTypeText
                ieType={type}
                connectionType={childrenConnectionType}
              />
              <List>
                {children.map((child) => (
                  <IntentionalElementListItem
                    key={uuidv4()}
                    intentionalElementType={IntentionalElementType.GOAL}
                  >
                    {child.name}
                  </IntentionalElementListItem>
                ))}
              </List>
            </>
          )}
          {qualities.map(({ quality, relation }) => (
            <QualitiesText
              key={uuidv4()}
              parentIeType={type}
              qualityType={relation}
            >
              {quality.name}
            </QualitiesText>
          ))}
        </CardContent>
      </Collapse>
    </ElevatedCard>
  );
}

function isTaskOrGoal(element: IntentionalElement) {
  return (
    element.type === IntentionalElementType.TASK ||
    element.type === IntentionalElementType.GOAL
  );
}

type propTypes = {
  element: IntentionalElement;
};
