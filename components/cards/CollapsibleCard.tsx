import React from "react";
import ElevatedCard from "./ElevatedCard";
import { CardContent, CardHeader, Collapse } from "@mui/material";
import ExpandMoreButton from "../ExpandMoreButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
