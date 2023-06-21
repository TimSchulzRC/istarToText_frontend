import { List, Paper, Typography } from "@mui/material";
import React from "react";

export default function ListCard({ children, title }: propTypes) {
  return (
    <Paper
      variant="outlined"
      sx={{ height: "calc(100vh - 100px)", overflow: "auto" }}
    >
      <Typography variant="h4" sx={{ p: 2 }}>
        {title}
      </Typography>
      <List>{children}</List>
    </Paper>
  );
}

type propTypes = { children: React.ReactNode; title: string };
