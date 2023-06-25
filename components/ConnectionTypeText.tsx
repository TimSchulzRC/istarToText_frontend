import { ConnectionType, IntentionType } from "@/types/intentionType";
import { Typography } from "@mui/material";

/**
 * A function that returns a JSX element that displays the connection type between an intentional element and its goals/tasks as "AND" or "OR".
 *
 * @param connectionType - The connection type between the intentional element and its goals/tasks.
 * @param ieType - The type of the intentional element ("GOAL" or "TASK").
 * @returns A JSX element that displays the connection type between the intentional element and its goals/tasks as "AND" or "OR".
 */
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
