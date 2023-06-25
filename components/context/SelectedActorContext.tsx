import Actor from "@/types/Actor";
import React, { Dispatch, SetStateAction } from "react";

/**
 * A context that provides the currently selected actor object.
 * This context is used to share the selected actor data between components.
 */
export const SelectedActorContext = React.createContext<Actor>({} as Actor);
/**
 * A context that provides a dispatch function to update the selected actor object.
 * This context is used to share the dispatch function between components.
 */
export const SelectedActorDispatchContext = React.createContext<
  Dispatch<SetStateAction<Actor>>
>(() => {});

/**
 * A provider component that sets a default actor and provides the selected actor object and a dispatch function to update it to its children components.
 *
 * @param children - The child components that will have access to the selected actor object and dispatch function.
 * @param defaultActor - The default actor object to use if no actor is selected.
 */
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
