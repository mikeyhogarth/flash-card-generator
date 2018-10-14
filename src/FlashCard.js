import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

const IMAGE_SIZE = 250;

const styles = {
  card: {
    maxWidth: IMAGE_SIZE,
  },
  media: {
    height: IMAGE_SIZE,

    width: IMAGE_SIZE,
  },
  searchTerm: {
    marginTop: '.5em'
  }
};

const FlashCard = (props) => {
  const { classes } = props;

  const { loading, images, title, searchTerm } = props.card;

  const searchTermLabel = title && !searchTerm ? `Search Term (${title})` : 'Search Term' 

  const image = images ? 
    images[0].contentUrl : 
    `https://via.placeholder.com/${IMAGE_SIZE}x${IMAGE_SIZE}`

  return (
    <Card className={classes.card}>
        { loading && <div style={ { textAlign: 'center', width: IMAGE_SIZE, height: IMAGE_SIZE } }>
            <CircularProgress size={100} style={ {marginTop: "25%" } } />
          </div>
        }

        { !loading && <CardMedia className={classes.media} image={image} /> }

        <CardContent>

          <TextField fullWidth
            label="Title"
            onChange={e => props.handleUpdateTitle(e.target.value)} />

          <TextField fullWidth
            label={searchTermLabel}
            onChange={e => props.handleUpdateSearchTerm(e.target.value)}
            className={classes.searchTerm} />

        </CardContent>      
    </Card>
  );
}

export default withStyles(styles)(FlashCard);

