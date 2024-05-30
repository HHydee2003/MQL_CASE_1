import axios from 'axios';

const api = axios.create({
  baseURL: 'mmongodb://localhost/Case_1', // Replace this with your backend server URL
  timeout: 5000,
});

export default api;
