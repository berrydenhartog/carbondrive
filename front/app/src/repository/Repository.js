import axios from "axios";
import Auth from '@aws-amplify/auth';

const baseDomain = "https://69bnfzn4ce.execute-api.eu-west-1.amazonaws.com";
const baseURL = `${baseDomain}/production`; // Incase of /api/v1;

let instance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'content-type': 'application/json',
    'X-Api-Key': 'buFKOY3HqY72ekh0ipQzx2cgVVbe45nt6YLxuoFT',
  }
});

instance.interceptors.request.use(config => {
  return Auth.currentSession().then(
    session => { 
      let accessToken = session.idToken.jwtToken; 
      config.headers.Authorization = `Bearer ${accessToken}`;
      return Promise.resolve(config); 
    }) 
  .catch(() => { 
    return Promise.resolve(config); 
  }); 
});

export default instance

