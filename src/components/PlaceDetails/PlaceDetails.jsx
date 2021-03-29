import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {},
  media: {
    // height: 140,
  },
});

const PlaceDetails = (props) => {
  const classes = useStyles();

  console.log("props", props);

  return (
    <Card className={classes.root}>
      {/* <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {props.exchanger.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.exchanger.address}
        </Typography>
        <Grid container spacing={2}>
                {Object.keys(props.exchanger.rates).map((currency, index) => (
                    <Grid
                        container
                        key={index}
                        justify="center"
                        spacing={2}>
                        <Grid item xs>
                            <Paper className="rate-row">{props.exchanger.rates[currency].bid}</Paper>
                        </Grid>
                        <Grid item xs>
                            <Paper className="rate-row">{currency}</Paper>
                        </Grid>
                        <Grid item xs>
                            <Paper className="rate-row">{props.exchanger.rates[currency].ask}</Paper>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
      </CardContent>

      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlaceDetails;
