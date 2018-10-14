import FlashCard from './FlashCard';
import { connect } from 'react-redux';
import { updateCardTitle, updateCardSearchTerm } from './ducks/app.duck';

const mapStateToProps = (state, ownProps) => {
  return {
    card: state.cards[ownProps.index],
    index: ownProps.index
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleUpdateTitle: (title) => {
    dispatch(updateCardTitle(ownProps.index, title))
  },
  handleUpdateSearchTerm: (searchTerm) => {
    dispatch(updateCardSearchTerm(ownProps.index, searchTerm))
  } 
})

export default connect(mapStateToProps, mapDispatchToProps)(FlashCard);