import { ActorType, getActorTypeDescription } from "@/types/actorType";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import {
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import ElevatedCard from "./ElevatedCard";

export default function ActorCard({ name, actorType }: propTypes) {
  return (
    <ElevatedCard>
      <CardHeader
        title={name}
        subheader={actorType}
        action={
          <Tooltip title={getActorTypeDescription(actorType)}>
            <IconButton>
              <InfoRoundedIcon />
            </IconButton>
          </Tooltip>
        }
      />
      <CardContent>
        <Typography variant="body2">
          <Typography variant="h6" component="span">
            3{" "}
          </Typography>
          outgoing dependencies
        </Typography>

        <Typography variant="body2">
          <Typography variant="h6" component="span">
            2{" "}
          </Typography>
          incoming dependencies
        </Typography>

        <Typography variant="body2">
          <Typography variant="h6" component="span">
            1{" "}
          </Typography>
          general goal(s)
        </Typography>
        <Typography variant="body2">
          <Typography variant="h6" component="span">
            5{" "}
          </Typography>
          general goal(s)
        </Typography>
      </CardContent>
    </ElevatedCard>
  );
}

type propTypes = { name: string; actorType: ActorType };
