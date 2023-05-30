import IntentionalElement from "@/types/IntentionalElement";
import React, { Dispatch, SetStateAction } from "react";
import { SelectedActorContext } from "./SelectedActorContext";

export const SelectedIntentionalElementContext =
  React.createContext<IntentionalElement | null>(null);
export const SelectedIntentionalElementDispatchContext = React.createContext<
  Dispatch<SetStateAction<IntentionalElement | null>>
>(() => {});

export default function SelectedIntentionalElementProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const selectedActor = React.useContext(SelectedActorContext);
  const [selectedIntentionalElement, setSelectedIntentionalElement] =
    React.useState<IntentionalElement | null>(null);
  return (
    <SelectedIntentionalElementContext.Provider
      value={selectedIntentionalElement}
    >
      <SelectedIntentionalElementDispatchContext.Provider
        value={setSelectedIntentionalElement}
      >
        {children}
      </SelectedIntentionalElementDispatchContext.Provider>
    </SelectedIntentionalElementContext.Provider>
  );
}
