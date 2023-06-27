import Actor from "@/types/Actor";
import Intention from "@/types/Intention";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useContext } from "react";
import ActorDetails from "./ActorDetails";
import IntentionDetails from "./IntentionDetails";
import { SelectedActorContext } from "./context/SelectedActorContext";
import { SelectedIntentionContext } from "./context/SelectedIntentionContext";

/**
 * A component that displays the details of an actor or an intentional element, depending on the props passed to it.
 *
 * @param actor - The actor to display details for.
 * @param intention - The intentional element to display details for.
 * @returns A JSX element that displays the details of an actor or an intentional element, depending on the props passed to it.
 */
export default function DetailsScreen({
  actor,
  intention,
}: {
  actor?: Actor;
  intention?: Intention;
}) {
  const selectedActor = useContext(SelectedActorContext);
  const selectedIntention = useContext(SelectedIntentionContext);

  return (
    <Card
      variant="outlined"
      sx={{
        height: "calc(100vh - 100px)",
        overflow: "auto",
      }}
    >
      <CardHeader
        title={
          <Typography variant="h2">
            {intention?.name ||
              actor?.name ||
              selectedIntention?.name ||
              selectedActor.name}
          </Typography>
        }
      />
      <CardContent>
        {selectedIntention && !intention && (
          <IntentionDetails intention={selectedIntention} />
        )}
        {intention && <IntentionDetails intention={intention} />}

        {!selectedIntention && !intention && (
          <ActorDetails actor={actor || selectedActor} />
        )}
        {actor && <ActorDetails actor={actor} />}
      </CardContent>
    </Card>
  );
}
