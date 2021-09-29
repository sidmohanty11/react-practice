import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://randomstuffs-mern.herokuapp.com'
});

export default instance;