import React from "react";
import { ActorsContext } from "./context/ActorsContext";
import ActorListItem from "./ActorListItem";
import ListCard from "./cards/ListCard";
import { v4 as uuidv4 } from "uuid";

export default function ActorsList() {
  const actors = React.useContext(ActorsContext);
  return (
    <ListCard title="Actors">
      {actors.map((actor) => (
        <ActorListItem key={uuidv4()} actor={actor} />
      ))}
    </ListCard>
  );
}
