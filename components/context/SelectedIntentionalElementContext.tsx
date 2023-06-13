import Intention from "@/types/Intention";
import React, { Dispatch, SetStateAction } from "react";
import { SelectedActorContext } from "./SelectedActorContext";

export const SelectedIntentionContext = React.createContext<Intention | null>(
  null
);
export const SelectedIntentionDispatchContext = React.createContext<
  Dispatch<SetStateAction<Intention | null>>
>(() => {});

export default function SelectedIntentionalElementProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const selectedActor = React.useContext(SelectedActorContext);
  const [selectedIntentionalElement, setSelectedIntentionalElement] =
    React.useState<Intention | null>(null);
  return (
    <SelectedIntentionContext.Provider value={selectedIntentionalElement}>
      <SelectedIntentionDispatchContext.Provider
        value={setSelectedIntentionalElement}
      >
        {children}
      </SelectedIntentionDispatchContext.Provider>
    </SelectedIntentionContext.Provider>
  );
}
