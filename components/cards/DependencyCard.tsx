import React from "react";
import ElevatedCard from "./ElevatedCard";
import { CardContent, CardHeader, Chip, Typography } from "@mui/material";
import Dependency from "@/types/Dependency";
import CollapsibleCard from "./CollapsibleCard";

export default function DependencyCard({ dependency }: propTypes) {
  return (
    <CollapsibleCard title={dependency.name} subheader={dependency.type}>
      <Typography>
        Student depends on <Chip label={dependency.name} onClick={() => {}} />{" "}
        for <Chip label={dependency.ownElement.name} onClick={() => {}} />. For
        this, <Chip label={dependency.otherActor.name} onClick={() => {}} /> has
        to complete{" "}
        <Chip label={dependency.otherElement.name} onClick={() => {}} />
      </Typography>
    </CollapsibleCard>
  );
}
type propTypes = { dependency: Dependency };
