import axios from 'axios';

const api = axios.create({
    baseURL: 'https://apiamigochocolate.herokuapp.com/'
});

export default api;