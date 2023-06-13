import Actor from "@/types/Actor";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { SelectedIntentionDispatchContext } from "./SelectedIntentionContext";

export const SelectedActorContext = React.createContext<Actor>({} as Actor);
export const SelectedActorDispatchContext = React.createContext<
  Dispatch<SetStateAction<Actor>>
>(() => {});

export default function SelectedActorProvider({
  children,
  defaultActor,
}: {
  children: React.ReactNode;
  defaultActor: Actor;
}) {
  const [selectedActor, setSelectedActor] = React.useState<Actor>(defaultActor);

  return (
    <SelectedActorContext.Provider value={selectedActor}>
      <SelectedActorDispatchContext.Provider value={setSelectedActor}>
        {children}
      </SelectedActorDispatchContext.Provider>
    </SelectedActorContext.Provider>
  );
}
