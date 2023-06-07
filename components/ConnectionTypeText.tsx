import { ConnectionType, IntentionType } from "@/types/intentionType";
import { Typography } from "@mui/material";

export default function connectionTypeAnd({
  connectionType,
  ieType,
}: propTypes) {
  const firstTextParagraph = (
    <>
      To {isTask() ? "complete" : "achieve"} this {ieType.toLowerCase()},
      &quot;Student&quot; must have{" "}
    </>
  );

  const lastTextParagraph = (
    <> of the following goals achieved and tasks completed:</>
  );

  if (connectionType === ConnectionType.AND)
    return (
      <Typography variant="body1">
        {firstTextParagraph}
        <Typography variant="h6" component="span">
          all
        </Typography>{" "}
        {lastTextParagraph}
      </Typography>
    );
  if (connectionType === ConnectionType.OR)
    return (
      <Typography variant="body1">
        {firstTextParagraph}
        <Typography variant="h6" component="span">
          at least one
        </Typography>{" "}
        {lastTextParagraph}
      </Typography>
    );
  return <></>;

  function isTask() {
    return ieType === IntentionType.TASK;
  }
}

type propTypes = {
  connectionType: ConnectionType;
  ieType: IntentionType;
};
