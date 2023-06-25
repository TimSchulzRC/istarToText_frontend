import { IconButton, IconButtonProps, styled } from "@mui/material";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

/**
 * A styled component that renders an `IconButton` with a down arrow icon that rotates 180 degrees when expanded.
 *
 * @param expand - Whether the component is expanded or not.
 * @returns A JSX element that renders an `IconButton` with a down arrow icon that rotates 180 degrees when expanded.
 */
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default ExpandMore;
