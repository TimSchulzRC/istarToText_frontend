import React from "react";
import { ActorsContext } from "./context/ActorsContext";
import ActorListItem from "./ActorListItem";
import ListCard from "./cards/ListCard";
import { v4 as uuidv4 } from "uuid";

export default function ActorsList() {
  const actors = React.useContext(ActorsContext);
  return (
    <ListCard title="Actors">
      {Array.from(actors).map(([id, actor]) => {
        return <ActorListItem key={id} actor={actor} />;
      })}
    </ListCard>
  );
}
