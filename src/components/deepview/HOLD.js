import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography,Button } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';

export const HOLD = (props) => (
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            HOLD
          </Typography>

        </Grid>
        
      </Grid>
        <Grid item>
            <Button variant="contained">HOLD
          </Button>
        </Grid>
    </CardContent>
  </Card>
);
