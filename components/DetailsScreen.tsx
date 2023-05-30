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
import { ActorsContext } from "./context/ActorsContext";
import { SelectedActorContext } from "./context/SelectedActorContext";
import { SelectedIntentionalElementContext } from "./context/SelectedIntentionalElementContext";
import IntentionsPhrase from "./IntentionsPhrase";
import { DependenciesContext } from "./context/DependenciesContext";
import { IntentionalElementType } from "@/types/intentionalElementType";
import IeListTextPhrase from "./IeListTextPhrase";

export default function DetailsScreen() {
  const dependencies = useContext(DependenciesContext);
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

  if (selectedIntentionalElement) {
    const selectedElementChildren = selectedActor.elements.filter((e) =>
      selectedIntentionalElement.children.includes(e.id)
    );
    const selectedElementSubGoals = selectedElementChildren.filter(
      (e) => e.type === IntentionalElementType.GOAL
    );
    const selectedElementSubGoalsCount = selectedElementSubGoals.length;
    const selectedElementTasks = selectedElementChildren.filter(
      (e) => e.type === IntentionalElementType.TASK
    );
    const selectedElementTasksCount = selectedElementTasks.length;

    return (
      <Card variant="outlined" sx={{ height: "100%" }}>
        <CardHeader
          title={<Typography variant="h2">{element.name}</Typography>}
        />
        <CardContent>
          <>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <Chip label="Goal" color="warning" />
              <Chip label="Task" color="secondary" />
              <Chip label="Ressource" color="primary" />
              <Chip label="Quality" color="success" />
              <Chip label="Actor" />
            </Stack>
            <Typography>
              {selectedIntentionalElement.name} is an element of{" "}
              <strong>{selectedIntentionalElement.type}</strong>.
              <br />
              <br />
              To
              {selectedIntentionalElement.type ===
                IntentionalElementType.GOAL && " achieve "}
              {selectedIntentionalElement.type ===
                IntentionalElementType.TASK && " complete "}
              {selectedIntentionalElement.type ===
                IntentionalElementType.QUALITY && " ensure "}
              {selectedIntentionalElement.type ===
                IntentionalElementType.RESOURCE && " obtain "}
              <Chip
                component={"span"}
                label={selectedIntentionalElement.name}
              />
              ,{" "}
              {selectedElementSubGoalsCount > 0 && (
                <>
                  {selectedElementSubGoals.map((e, i) => (
                    <>
                      {elementIsNotFirstOrLast(
                        i,
                        selectedElementSubGoalsCount
                      ) && ", "}{" "}
                      {elementIsLast(i, selectedElementSubGoalsCount) &&
                        selectedIntentionalElement.childrenLinkType}{" "}
                      <Chip
                        key={uuidv4()}
                        color="warning"
                        component={"span"}
                        onClick={() => {}}
                        label={e.name}
                      />
                    </>
                  ))}{" "}
                  {selectedIntentionalElement.childrenLinkType === "and" &&
                    "have "}
                  {selectedIntentionalElement.childrenLinkType === "or" &&
                    "has "}
                  to be achieved
                  {selectedElementTasks.length > 0
                    ? selectedIntentionalElement.childrenLinkType
                    : "."}
                </>
              )}
              {selectedElementTasksCount > 0 && (
                <>
                  {selectedElementTasks.map((e, i) => (
                    <>
                      {elementIsNotFirstOrLast(i, selectedElementTasksCount) &&
                        ", "}{" "}
                      {elementIsLast(i, selectedElementTasksCount) &&
                        selectedIntentionalElement.childrenLinkType}{" "}
                      <Chip
                        key={uuidv4()}
                        color="secondary"
                        component={"span"}
                        onClick={() => {}}
                        label={e.name}
                      />
                    </>
                  ))}{" "}
                  {selectedIntentionalElement.childrenLinkType === "and" &&
                    "have "}
                  {selectedIntentionalElement.childrenLinkType === "or" &&
                    "has "}
                  to be completed.
                </>
              )}
            </Typography>
          </>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardHeader
        title={<Typography variant="h2">{element.name}</Typography>}
      />
      <CardContent>
        <>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Chip label="Goal" color="warning" />
            <Chip label="Task" color="secondary" />
            <Chip label="Ressource" color="primary" />
            <Chip label="Quality" color="success" />
            <Chip label="Actor" />
          </Stack>
          <Typography>
            {selectedActor.name} is of type{" "}
            <strong>{selectedActor.type}</strong>.
            <br />
            <br />
            {selectedActor.linksTo.length > 0 && (
              <>
                {selectedActor.linksTo.map((e, i) => (
                  <>
                    {selectedActor.name} {e.type}{" "}
                    <Chip
                      key={uuidv4()}
                      component={"span"}
                      onClick={() => {}}
                      label={actors.find((a) => a.id === e.id)?.name}
                    />
                    .
                  </>
                ))}
                <br />
                <br />
              </>
            )}
            {ieCount > 0 && <IntentionsPhrase actor={selectedActor} />}
            {dCount > 0 && (
              <>
                <br />
                <br />
                {selectedActor.name} has <strong>{numberText(dCount)}</strong>{" "}
                dependency.
                <br />
                {selectedActor.name} depends on{" "}
                {console.log(getDependencies(selectedActor))}
                {getDependencies(selectedActor).map((d, i) => (
                  <>
                    {elementIsNotFirstOrLast(i) && ", "}
                    {elementIsLast(i) && " and "}
                    <Chip
                      key={uuidv4()}
                      component="span"
                      label={actors.find((a) => a.id === d.dependee)?.name}
                    />{" "}
                    to
                    {d.type === IntentionalElementType.GOAL && (
                      <>
                        {" "}
                        achieve{" "}
                        <Chip
                          key={uuidv4()}
                          component="span"
                          label={d.name}
                          color="warning"
                        />
                      </>
                    )}
                    {d.type === IntentionalElementType.TASK && (
                      <>
                        {" "}
                        complete{" "}
                        <Chip
                          key={uuidv4()}
                          component="span"
                          label={d.name}
                          color="secondary"
                        />
                      </>
                    )}
                    {d.type === IntentionalElementType.QUALITY && (
                      <>
                        {" "}
                        ensure{" "}
                        <Chip
                          key={uuidv4()}
                          component="span"
                          label={d.name}
                          color="success"
                        />
                      </>
                    )}
                    {d.type === IntentionalElementType.TASK && (
                      <>
                        {" "}
                        provide{" "}
                        <Chip
                          key={uuidv4()}
                          component="span"
                          label={d.name}
                          color="primary"
                        />
                      </>
                    )}
                  </>
                ))}
                .
              </>
            )}
          </Typography>
        </>
      </CardContent>
    </Card>
  );

  function elementIsNotFirstOrLast(index: number, count?: number) {
    return ieCount > 1 && index > 0 && index < (count || ieCount) - 2;
  }

  function elementIsLast(index: number, count?: number) {
    return index > 0 && index === (count || ieCount) - 1;
  }

  // function getDependencyNames(actor: Actor) {
  //   return actor.dependencies.map((e) => actors.filter((a) => a.id === e)[0]);
  // }

  function getDependencies(actor: Actor) {
    return dependencies.filter((d) => d.depender === actor.id);
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
