import { Avatar, Box, Card, CardContent, Grid, Typography,Button } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';

export const START = (props) => (
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
            START
          </Typography>
         
        </Grid>
        
      </Grid>
        <Grid item>
            <Button variant="contained">START
          </Button>
        </Grid>
    </CardContent>
  </Card>
);
