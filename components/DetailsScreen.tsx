import Actor from "@/types/Actor";
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import IeListTextPhrase from "./IeListTextPhrase";
import { ActorsContext } from "./context/ActorsContext";
import { SelectedActorContext } from "./context/SelectedActorContext";
import { SelectedIntentionalElementContext } from "./context/SelectedIntentionalElementContext";
import IntentionsPhrase from "./IntentionsPhrase";

export default function DetailsScreen() {
  const actors = useContext(ActorsContext);
  const selectedActor = useContext(SelectedActorContext);
  const selectedIntentionalElement = useContext(
    SelectedIntentionalElementContext
  );
  const element = selectedIntentionalElement
    ? selectedIntentionalElement
    : selectedActor;

  const ieCount = selectedActor.elements.length;
  const dCount = selectedActor.dependencies.length;
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardHeader
        title={<Typography variant="h2">{element.name}</Typography>}
      />
      <CardContent>
        <Typography>
          {selectedIntentionalElement ? (
            <></>
          ) : (
            <>
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Chip label="Goal" color="warning" />
                <Chip label="Task" color="secondary" />
                <Chip label="Ressource" color="primary" />
                <Chip label="Quality" color="success" />
                <Chip label="Actor" />
              </Stack>
              {selectedActor.name} is of type{" "}
              <strong>{selectedActor.type}</strong>.
              <br />
              {selectedActor.parentId && (
                <>
                  {selectedActor.name}
                  is a{" "}
                  <Chip
                    onClick={() => {}}
                    label={getParentName(selectedActor.parentId)}
                  />
                  <br />
                </>
              )}
              {ieCount > 0 && <IntentionsPhrase actor={selectedActor} />}
              {dCount > 0 && (
                <>
                  <br />
                  {selectedActor.name} has <strong>{numberText(dCount)}</strong>{" "}
                  dependency:
                  <br />
                  {selectedActor.name} depends on{" "}
                  {/* {getDependencyNames(selectedActor).map((d, i) => (
                    <ListTextPhrase
                      key={uuidv4()}
                      index={i}
                      count={dCount}
                      element={d}
                    />
                  ))} */}
                </>
              )}
            </>
          )}
        </Typography>
      </CardContent>
    </Card>
  );

  function elementIsNotFirstOrLast(index: number) {
    return ieCount > 1 && index >= 0 && index < ieCount - 2;
  }

  function elementIsLast(index: number) {
    return index > 0 && index === ieCount - 1;
  }

  function getDependencyNames(actor: Actor) {
    return actor.dependencies.map((e) => actors.filter((a) => a.id === e)[0]);
  }

  function numberText(n: number) {
    if (n === 1) return "one";
    if (n === 2) return "two";
    if (n === 3) return "tree";
    return n;
  }

  function getParentName(id: string) {
    return actors.find((o) => o.id === id)?.name;
  }
}
