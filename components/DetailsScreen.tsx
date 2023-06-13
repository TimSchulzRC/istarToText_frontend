import Actor from "@/types/Actor";
import Intention from "@/types/Intention";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useContext } from "react";
import ActorDetails from "./ActorDetails";
import ChipDescription from "./ChipDescription";
import IntentionDetails from "./IntentionDetails";
import { SelectedActorContext } from "./context/SelectedActorContext";
import { SelectedIntentionContext } from "./context/SelectedIntentionContext";

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
    <Card variant="outlined" sx={{ height: "100%" }}>
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
        <ChipDescription />
        {selectedIntention && !intention && (
          <IntentionDetails intention={selectedIntention} />
        )}
        {intention && <IntentionDetails intention={intention} />}

        {!selectedIntention && !intention && (
          <ActorDetails actor={actor || selectedActor} />
        )}
      </CardContent>
    </Card>
  );
}
