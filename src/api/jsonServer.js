import axios from 'axios';

// This needs to be updated for each new ngrok session
const ngrokURL = 'http://0bed6d1adf69.ngrok.io'

export default axios.create({
    baseURL: `${ngrokURL}`
});

