import React, { createContext } from "react";

export const HoverDepthContext =
  createContext<React.MutableRefObject<number> | null>(null);
export const IncrementHoverDepthContext = createContext<() => void>(() => {});
export const DecrementHoverDepthContext = createContext<() => void>(() => {});

/**
 * A component that provides a context for the hover depth of an element.
 *
 * @param children - The child components to render.
 * @returns The `HoverDepthProvider` component.
 */
export default function HoverDepthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const hoverDepth = React.useRef(1);

  /**
   * A function that increments the hover depth.
   */
  function incrementHoverDepth() {
    hoverDepth.current++;
  }

  /**
   * A function that decrements the hover depth.
   */
  function decrementHoverDepth() {
    hoverDepth.current--;
  }

  return (
    <HoverDepthContext.Provider value={hoverDepth}>
      <IncrementHoverDepthContext.Provider value={incrementHoverDepth}>
        <DecrementHoverDepthContext.Provider value={decrementHoverDepth}>
          {children}
        </DecrementHoverDepthContext.Provider>
      </IncrementHoverDepthContext.Provider>
    </HoverDepthContext.Provider>
  );
}
