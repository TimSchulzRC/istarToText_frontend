import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

export default function ListCard({ children, title }: propTypes) {
  return (
    <Card variant="outlined">
      <CardHeader title={<Typography variant="h3">{title}</Typography>} />
      <CardContent>
        <Stack spacing={2}>{children}</Stack>
      </CardContent>
    </Card>
  );
}

type propTypes = { children: React.ReactNode; title: string };
