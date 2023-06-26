"use client";
import ActorsList from "@/components/ActorsList";
import DetailsScreen from "@/components/DetailsScreen";
import IntentionsList from "@/components/IntentionsList";
import MenuBar from "@/components/MenuBar";
import ActorsProvider from "@/components/context/ActorsContext";
import DependenciesProvider from "@/components/context/DependenciesContext";
import HistoryProvider from "@/components/context/HistoryContext";
import HoverDepthProvider from "@/components/context/HoverDepthContext";
import SelectedIntentionProvider from "@/components/context/SelectedIntentionContext";
import { Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

export default function Home() {
  return (
    <main style={{ display: "flex" }}>
      <HistoryProvider>
        <DependenciesProvider>
          <ActorsProvider>
            <SelectedIntentionProvider>
              <MenuBar />
              <Container maxWidth="xl" sx={{ mt: 10 }}>
                <Grid container>
                  <Grid xs={12} md={3}>
                    <ActorsList />
                  </Grid>
                  <Grid xs={12} md={3}>
                    <IntentionsList />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <HoverDepthProvider>
                      <DetailsScreen />
                    </HoverDepthProvider>
                  </Grid>
                </Grid>
              </Container>
            </SelectedIntentionProvider>
          </ActorsProvider>
        </DependenciesProvider>
      </HistoryProvider>
    </main>
  );
}
