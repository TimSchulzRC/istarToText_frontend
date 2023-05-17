import {
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { ActorType, getActorTypeDescription } from "@/types/actorType";
import ElevatedCard from "./ElevatedCard";

export default function ActorCard({ actorType }: propTypes) {
  return (
    <ElevatedCard>
      <CardHeader
        title="Student"
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
            8{" "}
          </Typography>
          general goal(s)
        </Typography>
      </CardContent>
    </ElevatedCard>
  );
}

type propTypes = { actorType: ActorType };
