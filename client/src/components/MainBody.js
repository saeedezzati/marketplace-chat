// Components
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ItemCard from '../containers/ItemCard'
import ChatDialog from '../containers/ChatDialog'

import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import grey from 'material-ui/colors/grey';

import items  from "./items.json";

const styles = theme => ({
    root: {
        width: '100%',
        minHeight: '1200px',
        
    },
    mainColumn: {
        width: '100%',
        height: '100%',
    },
    
    header: {
        width: '100%',
        height: 80,
    
    },
    senderAvatar:{
        top: 33,
        border: '1px solid ' + grey[400],
        float:'right'
    },
    body: {
        width: '100%',
        height: '100%',
    },
    itemList:{
        width: '100%',
        height: '100%',
        padding: 20,
    },
    item:{
        width: '100%',
        padding: 8,
    },

})
class MainBody extends Component {
    componentDidMount() {		    
        const { senderID, setAppState, dispatch  } = this.props;		 
        if(!senderID){
            setAppState({'senderID':Math.floor(Math.random()*16777215).toString(16)})
        }
    }
    render(){
        const {senderID,classes} = this.props
        
        return (
            <div className={classes.root}>
                <ChatDialog />
                <Grid container spacing={0} direction={'column'} justify={'flex-start'} alignItems={'center'} className={classes.mainColumn}>
                    {senderID &&
                        <Grid item xs={6} className={classes.header}>
                            <Avatar style={{backgroundColor:'#'+senderID}}  className={classes.senderAvatar}>{senderID.slice(0,2)}</Avatar>
                        </Grid>
                    }
                    <Grid item xs={6} className={classes.body}>
                        <Grid container spacing={0} direction={'row'} justify={'flex-start'} alignItems={'flex-start'} className={classes.itemList}>
                            {items.slice(0,100).map((item,index) => {
                                if(item.rent_price_day){
                                    return(
                                        <Grid key={index} item xs={3} className={classes.item}>
                                            <ItemCard item={item} />
                                        </Grid>
                                    )
                                }
                            })}
                        </Grid>
                            
                    </Grid>
                    
                </Grid>
            </div>
        )
    }
}



MainBody.propTypes = {
    classes: PropTypes.object.isRequired,
    setAppState: PropTypes.func.isRequired,
    senderID: PropTypes.string,//.isRequired,
    dispatch: PropTypes.func.isRequired,
}

export default withStyles(styles)(MainBody);