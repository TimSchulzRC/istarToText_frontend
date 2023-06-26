import Intention from "@/types/Intention";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { AddHistoryItemContext } from "./HistoryContext";
import { SelectedActorContext } from "./SelectedActorContext";

/**
 * A context that provides the currently selected intention object.
 * This context is used to share the selected intention data between components.
 */
export const SelectedIntentionContext = React.createContext<Intention | null>(
  null
);
/**
 * A context that provides a dispatch function to update the selected intention object.
 * This context is used to share the dispatch function between components.
 */
export const SelectedIntentionDispatchContext = React.createContext<
  Dispatch<SetStateAction<Intention | null>>
>(() => {});

/**
 * A provider component that sets the currently selected intention object to null and provides the selected intention object and a dispatch function to update it to its children components.
 *
 * @param children - The child components that will have access to the selected intention object and dispatch function.
 */
export default function SelectedIntentionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedIntention, setSelectedIntention] =
    React.useState<Intention | null>(null);
  const selectedActor = React.useContext(SelectedActorContext);
  const addHistoryItem = React.useContext(AddHistoryItemContext);

  useEffect(() => {
    if (selectedIntention !== null) {
      selectedIntention.actor = selectedActor;
      addHistoryItem(selectedIntention);
    }
  }, [selectedIntention]);

  return (
    <SelectedIntentionContext.Provider value={selectedIntention}>
      <SelectedIntentionDispatchContext.Provider value={setSelectedIntention}>
        {children}
      </SelectedIntentionDispatchContext.Provider>
    </SelectedIntentionContext.Provider>
  );
}
