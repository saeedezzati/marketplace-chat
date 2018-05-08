import { connect } from 'react-redux';
import ChatDialogComponent from '../components/ChatDialogComponent';
import { withRouter } from 'react-router';
import { setAppState } from '../actions/actions'
import { ApiMessage } from './ApiMessage.js';


const mapStateToProps = (state) => {
  	return {
		senderID: state.app.senderID,
		chatItem: state.app.chatItem,
		chatDialogIsOpen: state.app.chatDialogIsOpen,
		message: state.app.message,
		messages: state.app.messages,
  	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  	return {
		ApiMessage: ApiMessage,
		setAppState: ( (data) => {dispatch(setAppState(data))}),
		dispatch: dispatch, 
  	}
}

const ChatDialog = withRouter(connect(
  	mapStateToProps,
  	mapDispatchToProps
)(ChatDialogComponent))

export default ChatDialog;
