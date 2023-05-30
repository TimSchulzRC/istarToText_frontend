import Actor from "@/types/Actor";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import test from "@/resources/test.json";
import { ActorType } from "@/types/actorType";
import SelectedActorProvider from "./SelectedActorContext";
import IntentionalElement from "@/types/IntentionalElement";

export const ActorsContext = React.createContext<Actor[]>([]);

export default function ActorsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [actors, setActors] = React.useState<Actor[]>([]);
  const effectRan = React.useRef(false);
  useEffect(() => {
    if (!effectRan.current) {
      test.actors.forEach((actor) => {
        setActors((prev) => [
          ...prev,
          {
            id: actor.id,
            name: actor.name,
            type: actor.type as ActorType,
            linksTo: actor.linksTo,
            elements: actor.elements as IntentionalElement[],
            dependencies: actor.dependencies as string[],
          },
        ]);
      });
      return () => {
        effectRan.current = true;
      };
    }
  }, []);

  return (
    <ActorsContext.Provider value={actors}>
      {actors.length > 0 && (
        <SelectedActorProvider defaultActor={actors[0]}>
          {children}
        </SelectedActorProvider>
      )}
    </ActorsContext.Provider>
  );
}
