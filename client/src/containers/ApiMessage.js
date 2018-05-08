// https://tools.ietf.org/html/rfc6749#section-4.4
import axios from 'axios';
import { setAppState, clearAppState } from '../actions/actions'
import cookies from 'react-cookies';

import { URL, GET_MESSAGES, POST_MESSAGE  } from '../config/Api';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";


Date.prototype.addHours = function(h){
    this.setHours(this.getHours()+h);
    return this;
}

export function errorHandler(error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    console.log(error.config);
}

export const ApiMessage = {
    getMessages: (item, dispatch) => {
        var config = {
            headers: {
                // 'Access-Control-Allow-Headers': '*',
                // 'Access-Control-Allow-Origin': '*',
                'X-CSRFToken': cookies.load('csrftoken'),
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            params: {
                'item': item
            }
        }
        return axios
            .get(URL + GET_MESSAGES , config)
            .then(function (response) {
                dispatch(setAppState({messages:response.data}));
                
            })
            .catch(function (error) { 
                errorHandler(error)
            })
    },
    postMessage: (sender, item, message, messages, dispatch) => {
        var config = {
            headers: {
                'X-CSRFToken': cookies.load('csrftoken'),
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }

        var body = new URLSearchParams();
        body.append('sender', sender);
        body.append('item', item);
        body.append('message', message);

        return axios
            .post(URL + POST_MESSAGE, body, config)
            .then(function (response) {
                dispatch(setAppState({ message: '', messages:[...messages,response.data]}));
                var element = document.getElementById('dialogContent');
                element.scrollTop = element.scrollHeight - element.clientHeight;
                // dispatch(setAppState({message:response.data}));
            })
            .catch(function (error) { 
                errorHandler(error)
            });
    }
    
}

