import Actor from "@/types/Actor";
import React, { useEffect } from "react";
import SelectedActorProvider from "./SelectedActorContext";

/**
 * A context that provides a Map of actors, where the keys are the actor IDs and the values are the actor objects.
 * This context is used to share the actors data between components.
 */
export const ActorsContext = React.createContext<Map<string, Actor>>(
  new Map<string, Actor>()
);

/**
 * A provider component that fetches a list of actors from a JSON file and stores them in a Map.
 * It also sets a default actor and provides the actors Map and default actor to its children components.
 *
 * @param children - The child components that will have access to the actors Map and default actor.
 */
export default function ActorsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [actors, setActors] = React.useState<Map<string, Actor>>(
    new Map<string, Actor>()
  );
  const [defaultActor, setDefaultActor] = React.useState<Actor>({} as Actor);

  useEffect(() => {
    const actorsMap = new Map<string, Actor>();
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.actors);
        data.actors.forEach((actor: Actor) =>
          actorsMap.set(actor.id, actor as Actor)
        );
        setDefaultActor(data.actors[0] as Actor);
        setActors(actorsMap);
      });
  }, []);

  return (
    <>
      {actors.size > 0 ? (
        <ActorsContext.Provider value={actors}>
          <SelectedActorProvider defaultActor={defaultActor as Actor}>
            {children}
          </SelectedActorProvider>
        </ActorsContext.Provider>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
