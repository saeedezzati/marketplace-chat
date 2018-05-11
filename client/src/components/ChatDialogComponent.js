// Components
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Close from 'material-ui-icons/Close';

import avatar from '../../assets/avatar.png'

import grey from 'material-ui/colors/grey';
import indigo from 'material-ui/colors/indigo';

import items  from "./items.json";

const styles = theme => ({
    root:{
        minHeight: 500,
        
    },
    dialogTitle:{
        width: 400,
        height: 80,
    },
    closeDialogButton:{
        minWidth: 50,
        minHeight: 50,
        borderRadius: 25,
        marginLeft: 20,
        top:15,
        right:15,
        position:'absolute',
    },
    itemAvatar:{
        top: 10,
        left: 10,
        width: 60,
        height: 60,
        position: 'absolute',
    },
    itemName:{
        width: 300,
        fontSize: 20,
        fontWeight: 300,
        position: 'relative',
        left: 60
    },
    dialogContent:{
        border: '1px solid ' + grey[400],
        // margin: 5,
        height: 400,

    },

    textFieldRoot: {
        width: '100%',
        alignItems: 'center',
        padding: 0,
        'label + &': {
          marginTop: theme.spacing.unit * 3,
        },
        // marginTop: 10,
        margin: 5,
        border: '1px solid ' + grey[400],
        '&:focus-within': {
            borderColor: indigo[300],
        },
        
    },
    textFieldInput: {
        fontSize: 18,
        padding: '10px 12px',
        width: '100%',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        height: 30,
        borderRadius: 4,        
    },
    textFieldFormLabel: {
        fontSize: 18,
    },
    sendButton:{
        height: 50,        
        margin: 5,
    },
    messageContainer:{
        minHeight: 80
    },
    senderAvatar:{
        top: 33,
        border: '1px solid ' + grey[400],
        
        // left: 10,
        // width: 60,
        // height: 60,
        // position: 'absolute',
    },
    message:{
        width: 300,
        fontSize: 20,
        fontWeight: 300,
        position: 'relative',
        left: 60
    }
})
var pullMessages;
class ChatDialogComponent extends Component {
    componentWillReceiveProps(nextProps) {
        if( nextProps.messages.length>3){
            var element = document.getElementById('dialogContent');
            element.scrollTop = element.scrollHeight - element.clientHeight;	    
        }
    }
    handleClose = () => {
        const {chatDialogIsOpen, setAppState} = this.props
        setAppState({chatDialogIsOpen: !chatDialogIsOpen, message:'', messages:[]});   
        clearInterval(pullMessages)
    }
    handleEntered = () => {
        const { ApiMessage, chatItem, dispatch} = this.props
        var element = document.getElementById('dialogContent');
        element.scrollTop = element.scrollHeight - element.clientHeight;
        pullMessages = setInterval(() => ApiMessage.getMessages(chatItem.id, dispatch),3000)
        
    }
    handleMessageChange = (e) => {
        const { setAppState, } = this.props
        setAppState({ message: e.target.value});
    }
    handleMessageBoxKeyPress = (e) => {
        const {setAppState, message, messages, senderID, chatItem, ApiMessage, dispatch} = this.props
        if (e.keyCode == 13 ) {
            ApiMessage.postMessage(senderID, chatItem.id,message, messages, dispatch)
            
        }
    }
    handleSendMessageClick = () => {
        const {setAppState, message, messages, senderID, chatItem, ApiMessage, dispatch} = this.props
        ApiMessage.postMessage(senderID, chatItem.id,message, messages, dispatch)
        
    }
    render(){
        const {classes, chatItem, message, messages, senderID, chatDialogIsOpen} = this.props
        
        return (
            <Dialog onClose={this.handleClose} onEntered={this.handleEntered} open={chatDialogIsOpen}  className={classes.root}>
                <DialogTitle className={classes.dialogTitle}>
                    <Avatar src={chatItem.key_image+'?h=120&w=120&dpr=2'} alt={chatItem.name} className={classes.itemAvatar}/>
                    <Typography className={classes.itemName}>
                        {chatItem.name}
                    </Typography>
                    <Button className={classes.closeDialogButton} onClick={this.handleClose}>
                        <Close style={{width: 20, height: 20,}}/>
                    </Button>
                </DialogTitle>
                <DialogContent id='dialogContent' className={classes.dialogContent}>
                    {messages.map((m,index) => {
                        return(
                            <div key={index} className={classes.messageContainer}>
                                <Avatar style={{backgroundColor:'#'+m.sender}}  className={classes.senderAvatar}>{m.sender.slice(0,2)}</Avatar>
                                <Typography className={classes.message}>
                                    {m.message}
                                </Typography>
                            </div>
                            
                        )
                    })}
                </DialogContent>
                <Grid container spacing={0} direction={'row'} justify={'center'} alignItems={'center'}>
                    <Grid item xs={9} >
                        <TextField
                            style={{width:'98%'}}
                            placeholder="message.."
                            autoFocus={true}
                            value={message}
                            onChange={this.handleMessageChange}
                            InputProps={{
                                disableUnderline: true,
                                onKeyDown: this.handleMessageBoxKeyPress,
                                classes: {
                                    root: classNames(classes.textFieldRoot),
                                    input: classes.textFieldInput,
                                },
                            }}
                            InputLabelProps={{
                                shrink: true,
                                className: classes.textFieldFormLabel,
                            }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button className={classes.sendButton}  variant='raised' onClick={this.handleSendMessageClick}>
                            Send 
                        </Button>
                    </Grid>
                </Grid>
            </Dialog>
        )
    }
}



ChatDialogComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    chatItem: PropTypes.object.isRequired,
    senderID: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    messages: PropTypes.array.isRequired,
    chatDialogIsOpen: PropTypes.bool.isRequired,
    ApiMessage: PropTypes.object.isRequired,
    setAppState: PropTypes.func.isRequired,
}

export default withStyles(styles)(ChatDialogComponent);