import Actor from "@/types/Actor";
import Intention from "@/types/Intention";
import React from "react";

export const HistoryContext = React.createContext<(Intention | Actor)[]>([]);
export const AddHistoryItemContext = React.createContext<
  (item: Intention | Actor) => void
>(() => {});
export const PopHistoryItemContext = React.createContext<
  () => Intention | Actor | undefined
>(() => undefined);

/**
 * A component that provides a context for the history of intentions and actors.
 *
 * @param children - The child components to render.
 * @returns The `HistoryProvider` component.
 */
export default function HistoryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [history, setHistory] = React.useState<(Intention | Actor)[]>([]);

  /**
   * A function that adds an item to the history.
   *
   * @param item - The item to add to the history.
   */
  function addHistoryItem(item: Intention | Actor) {
    console.log("Adding history item: ", item);
    setHistory([...history, item]);
  }

  /**
   * A function that removes and returns the most recent item from the history.
   *
   * @returns The most recent item from the history.
   */
  function popHistoryItem() {
    const newHistory = [...history];
    const item = newHistory.pop();
    setHistory(newHistory);
    return item;
  }

  return (
    <HistoryContext.Provider value={history}>
      <AddHistoryItemContext.Provider value={addHistoryItem}>
        <PopHistoryItemContext.Provider value={popHistoryItem}>
          {children}
        </PopHistoryItemContext.Provider>
      </AddHistoryItemContext.Provider>
    </HistoryContext.Provider>
  );
}
