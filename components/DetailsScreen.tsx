import Actor from "@/types/Actor";
import Dependency from "@/types/Dependency";
import { useContext } from "react";
import ActorDetails from "./ActorDetails";
import { ActorsContext } from "./context/ActorsContext";
import { DependenciesContext } from "./context/DependenciesContext";
import { SelectedActorContext } from "./context/SelectedActorContext";
import { SelectedIntentionalElementContext } from "./context/SelectedIntentionalElementContext";
import IntentionDetails from "./IntentionDetails";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import ChipDescription from "./ChipDescription";

export default function DetailsScreen() {
  const dependencies = useContext(DependenciesContext);
  const actors = useContext(ActorsContext);
  const selectedActor = useContext(SelectedActorContext);
  const selectedIntention = useContext(SelectedIntentionalElementContext);

  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardHeader
        title={
          <Typography variant="h2">
            {selectedIntention?.name || selectedActor.name}
          </Typography>
        }
      />
      <CardContent>
        <ChipDescription />
        {selectedIntention ? (
          <IntentionDetails intention={selectedIntention} />
        ) : (
          <ActorDetails />
        )}
      </CardContent>
    </Card>
  );
}
