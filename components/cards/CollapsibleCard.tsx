import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CardContent, CardHeader, Collapse } from "@mui/material";
import React from "react";
import ExpandMoreButton from "../ExpandMoreButton";
import ElevatedCard from "./ElevatedCard";

export default function CollapsibleCard({
  title,
  subheader,
  children,
}: propTypes) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <ElevatedCard>
      <CardHeader
        title={title}
        subheader={subheader}
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
        <CardContent>{children}</CardContent>
      </Collapse>
    </ElevatedCard>
  );
}

type propTypes = {
  title: string;
  subheader: string;
  children: React.ReactNode;
};
