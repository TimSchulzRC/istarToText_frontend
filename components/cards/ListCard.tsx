import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListSubheader,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

export default function ListCard({ children, title }: propTypes) {
  return (
    <Paper variant="outlined" sx={{ height: "100%" }}>
      <Typography variant="h4" sx={{ p: 2 }}>
        {title}
      </Typography>
      <List>{children}</List>
    </Paper>
  );
}

type propTypes = { children: React.ReactNode; title: string };
