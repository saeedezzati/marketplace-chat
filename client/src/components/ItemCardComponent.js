// Components
import React, {Component} from 'react';
import PropTypes from 'prop-types';


import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import ChatBubble from 'material-ui-icons/ChatBubbleOutline';
import { Link } from 'react-router-dom';

import red from 'material-ui/colors/red';
import grey from 'material-ui/colors/grey';
import blue from 'material-ui/colors/blue';



const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        textDecoration: 'none',
        color: 'black',
        position: 'relative',
    },
    card: {
        width: '100%',
        // boxShadow:'unset',
    },
    rentPrice: {
        textAlign: 'center',
        color: red[500],
        backgroundColor: grey[50],
        width: 75,
        border: 'solid white 0px',
        borderRadius: 10,
        fontSize: 16,
        fontWeight: 200,
        top: 10,
        left: 10,
        position: 'absolute',
    },
    chatBubble:{
        position: 'absolute',
        top: 10,
        right: 10,
        color: blue[200],
        '&:hover':{
            cursor: 'pointer',
            color: blue[600],
        }
    },
    avatar:{
        bottom: 10,
        right: 10,
        position: 'absolute',
    },

})

class ItemCardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { imageLoaded: false };
    }
    componentDidMount() {		    
        const { dispatch  } = this.props;		 
    }
    handleChatBubbleClick = () => {
        const {chatDialogIsOpen, item, setAppState, ApiMessage, dispatch} = this.props
        setAppState({chatDialogIsOpen: !chatDialogIsOpen, chatItem: item});
        ApiMessage.getMessages(item.id, dispatch)
        
    }
    handleImageLoaded = () => {
        this.setState({ imageLoaded: true });
    }
    render(){
        const { classes, item} = this.props        

        return (
            <div to={'/'+ item.id} className={classes.root}>
                <Link to={'/'+ item.id} >
                    <img src={item.key_image} alt={item.name} onLoad={this.handleImageLoaded} className={classes.card} />
                </Link>
                {this.state.imageLoaded &&
                    <React.Fragment>
                        <Typography className={classes.rentPrice}>
                            ${item.rent_price_day/100}/day
                        </Typography>
                        <ChatBubble className={classes.chatBubble} onClick={this.handleChatBubbleClick}/>
                        <Avatar src={item.owner.avatar} alt={item.owner.first_name + '_' + item.owner.last_name} className={classes.avatar}/>
                    </React.Fragment>
                }
            </div>
        )
    }
}

ItemCardComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    chatDialogIsOpen: PropTypes.bool.isRequired,
    setAppState: PropTypes.func.isRequired,
    ApiMessage: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    
}

export default withStyles(styles)(ItemCardComponent);