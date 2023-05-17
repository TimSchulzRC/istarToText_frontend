import { ConnectionType } from "@/types/intentionalElementType";
import { Typography } from "@mui/material";

export default function connectionTypeAnd({
  connectionType,
}: {
  connectionType: ConnectionType;
}) {
  if (connectionType === ConnectionType.AND)
    return (
      <Typography variant="body1">
        To achieve this goal, &quot;Student&quot; must have{" "}
        <Typography variant="h6" component="span">
          all
        </Typography>{" "}
        of the following goals achieved and tasks completed:
      </Typography>
    );
  if (connectionType === ConnectionType.OR)
    return (
      <Typography variant="body1">
        To achieve this goal, &quot;Student&quot; must have achieve{" "}
        <Typography variant="h6" component="span">
          at least one
        </Typography>{" "}
        of the following goals achieved and tasks completed:
      </Typography>
    );
  return <></>;
}
