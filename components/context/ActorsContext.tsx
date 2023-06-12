import data from "@/resources/trustcomputingSR-2.json";
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

  useEffect(() => {
    const actorsMap = new Map<string, Actor>();
    data.actors.forEach((actor) => actorsMap.set(actor.id, actor as Actor));
    setActors(actorsMap);
  }, []);

  return (
    <>
      {actors.size > 0 ? (
        <ActorsContext.Provider value={actors}>
          <SelectedActorProvider defaultActor={data.actors[0] as Actor}>
            {children}
          </SelectedActorProvider>
        </ActorsContext.Provider>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
