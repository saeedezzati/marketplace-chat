import { connect } from 'react-redux';
import ItemCardComponent from '../components/ItemCardComponent';
import { setAppState } from '../actions/actions'
import { withRouter } from 'react-router';
import { ApiMessage } from './ApiMessage.js';


const mapStateToProps = (state, ownProps) => {
	return {
		item: ownProps.item,
		chatDialogIsOpen: state.app.chatDialogIsOpen,
		
	}
}


const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		ApiMessage: ApiMessage,
		setAppState: ( (data) => {dispatch(setAppState(data))}),
		dispatch: dispatch, 
		
	}
}

const ItemCard = withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(ItemCardComponent))


export default ItemCard;
