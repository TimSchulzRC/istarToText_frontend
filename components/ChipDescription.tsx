import { Chip, Divider, Popover, Stack, Typography } from "@mui/material";
import React from "react";

/**
 * A component that displays the details of an actor, including its name, type, description, links to other actors, intentions, and dependencies.
 *
 * @param actor - The actor object to display details for.
 */
export default function ChipDescription() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const [popoverContent, setPopoverContent] = React.useState<string>("");

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Stack direction="row" spacing={1}>
        <Typography variant="h5">Legende:</Typography>
        <Chip
          label="Actor"
          color="primary"
          onClick={(e) => {
            setPopoverContent(
              "Actors are active entities like persons, groups or systems. Their objective is to accomplish their own goals or contribute to the achievement of other goals. To provide a more detailed description, actors can be further characterized as agents or roles."
            );
            handleClick(e);
          }}
        />
        <Chip
          label="Agent"
          color="primary"
          onClick={(e) => {
            setPopoverContent(
              "Agents are specific actors within the system that can perform actions or make decisions. They have concrete manifestations, like humans, organizations or departments. Examples: Inventory Management System, Mike White"
            );
            handleClick(e);
          }}
        />
        <Chip
          label="Role"
          color="primary"
          onClick={(e) => {
            setPopoverContent(
              "Roles describe particular functions or responsibilities that actors can assume. They can be seen as jobs, that group actors together. Examples: Customer, Delivery Driver"
            );
            handleClick(e);
          }}
        />
        <Divider orientation="vertical" flexItem />
        <Chip
          label="Goal"
          color="warning"
          onClick={(e) => {
            setPopoverContent(
              "Goals are the desired outcomes actors want to achieve within the system. They have well-defined criteria of achievement. Examples: Get Delivery, Organize Inventory"
            );
            handleClick(e);
          }}
        />
        <Chip
          label="Task"
          color="secondary"
          onClick={(e) => {
            setPopoverContent(
              "Tasks are specific actions or activities performed by actors. They usually have the purpose of achieving some goal. Examples: Place Order, Process Payment"
            );
            handleClick(e);
          }}
        />
        <Chip
          label="Quality"
          color="success"
          onClick={(e) => {
            setPopoverContent(
              "Qualities refer to characteristics that actors aim to achieve to a certain extent. They can be defined precisely or vague. Examples: Profit, Fast Delivery"
            );
            handleClick(e);
          }}
        />
        <Chip
          label="Ressource"
          onClick={(e) => {
            setPopoverContent(
              "Resources are physical or informational entities that actors need in order to perform a task. Examples: Customer Database, Wallet"
            );
            handleClick(e);
          }}
        />
      </Stack>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2, width: 300 }}>{popoverContent}</Typography>
      </Popover>
    </>
  );
}
