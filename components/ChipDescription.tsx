import { Stack, Chip } from "@mui/material";

export default function ChipDescription() {
  return (
    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
      <Chip label="Goal" color="warning" />
      <Chip label="Task" color="secondary" />
      <Chip label="Ressource" color="primary" />
      <Chip label="Quality" color="success" />
      <Chip label="Actor" />
    </Stack>
  );
}
