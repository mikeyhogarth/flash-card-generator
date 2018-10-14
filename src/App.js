import React, { Component } from 'react';
import FlashCardDesigner from './FlashCard.container';
import Grid from '@material-ui/core/Grid';

const GridRow = ({ indexes }) => <Grid item xs={12}>
  <Grid container justify="center" spacing={16}>
    {indexes.map(i => (
      <Grid key={i} item>
        <FlashCardDesigner index={i} />
      </Grid>
    ))}
  </Grid>
</Grid>

class App extends Component {
  render() {
    return <Grid container spacing={16}>      
      <GridRow indexes={[0,1,2]} />
      <GridRow indexes={[3,4,5]} />
      <GridRow indexes={[6,7,8]} />
    </Grid>
  }
}

export default App;
