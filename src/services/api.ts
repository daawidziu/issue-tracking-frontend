import axios from "axios";

export default axios.create({
   withCredentials: true,
   baseURL: 'https://issue-tracking-api.herokuapp.com/',
   headers: {'Access-Control-Allow-Origin': '*',
   'accept': 'application/json',
   'Content-Type': 'application/json'}
});