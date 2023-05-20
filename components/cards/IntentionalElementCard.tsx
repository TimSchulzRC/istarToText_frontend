import {
  ConnectionType,
  IntentionalElementType,
} from "@/types/intentionalElementType";
import { Box, Chip, List, Typography } from "@mui/material";
import React from "react";
2;
import IntentionalElement from "@/types/IntentionalElement";
import { v4 as uuidv4 } from "uuid";
import ConnectionTypeText from "../ConnectionTypeText";
import IntentionalElementListItem from "../IntentionalElementListItem";
import QualitiesText from "../QualitiesText";
import CollapsibleCard from "./CollapsibleCard";

export default function IntentionalElementCard({
  element: {
    children,
    parentConnection,
    type,
    name,
    childrenConnectionType,
    qualities,
    dependencies,
  },
}: propTypes) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <CollapsibleCard title={name} subheader={type}>
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
            to {type === IntentionalElementType.GOAL ? "achieve" : "complete"}{" "}
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
      {dependencies.length > 0 && (
        <>
          <Typography>This {type.toLowerCase()} depends on: </Typography>
          <List>
            {dependencies.map((dependency) => (
              <IntentionalElementListItem
                key={dependency.id}
                intentionalElementType={dependency.type}
              >
                {dependency.name}
              </IntentionalElementListItem>
            ))}
          </List>
        </>
      )}
    </CollapsibleCard>
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
