import { Avatar, Box, Card, CardContent, Grid, Typography,Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';

export const STOP = (props) => (
  <Card 
    sx={{ height: '100%' }}
    {...props}>

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
            STOP
          </Typography>
          
        </Grid>
       
      </Grid>
        
        
        <Grid item>
            <Button variant="contained">STOP
          </Button>
        </Grid>
    </CardContent>
  </Card>
);
