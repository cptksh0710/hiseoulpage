import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { START } from "../components/deepview/START.js";
import { CCTVVIEW } from "../components/deepview/CCTVVIEW.js";
import { HOLD } from "../components/deepview/HOLD.js";
import { STOP } from "../components/deepview/STOP.js";
import { DashboardLayout } from "../components/dashboard-layout";
import { CCTVINFO } from "src/components/deepview/CCTVINFO.js";

const Deepview = () => (
  <>
    <Head>
      <title>Deepview | HISEOUL ML CONSOLE</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <START />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <STOP />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <HOLD />
          </Grid>

          <Grid item lg={8} md={8} xl={12} xs={12}>
            <CCTVVIEW />
          </Grid>

          <Grid item lg={4} md={6} xl={3} xs={12}>
            <CCTVINFO sx={{ height: "100%" }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Deepview.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Deepview;
