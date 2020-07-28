import axios from 'axios';
 
// configures base URL for axios requests
export default axios.create({
    baseURL: 'http://10.0.2.2:3000/api'
});