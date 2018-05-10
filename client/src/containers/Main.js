import { connect } from 'react-redux';
import MainBody from '../components/MainBody';
import { withRouter } from 'react-router';
import { setAppState } from '../actions/actions'


const mapStateToProps = (state) => {
  	return {
		senderID: state.app.senderID,
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  	return {
      	setAppState: ( (data) => {dispatch(setAppState(data))}),
		dispatch: dispatch, 
  	}
}

const Main = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MainBody))

export default Main;
