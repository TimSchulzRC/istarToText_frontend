import React from "react";
import ElevatedCard from "./ElevatedCard";
import { CardHeader } from "@mui/material";
import Dependency from "@/types/Dependency";

export default function DependencyCard({ dependency }: propTypes) {
  return (
    <ElevatedCard>
      <CardHeader title="" />
    </ElevatedCard>
  );
}
type propTypes = { dependency: Dependency };
