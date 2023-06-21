import Actor from "@/types/Actor";
import React, { useEffect } from "react";
import SelectedActorProvider from "./SelectedActorContext";

export const ActorsContext = React.createContext<Map<string, Actor>>(
  new Map<string, Actor>()
);

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
