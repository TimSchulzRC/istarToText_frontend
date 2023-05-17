import { Card } from "@mui/material";
import React from "react";

export default function ElevatedCard({ children }: propTypes) {
  return (
    <Card variant="elevation" elevation={10}>
      {children}
    </Card>
  );
}

type propTypes = { children: React.ReactNode };
