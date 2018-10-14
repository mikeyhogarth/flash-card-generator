import { isEmpty } from 'lodash'
import { retrieveItem, storeItem } from 'utils/storage';

const API_KEY = process.env.REACT_APP_BING_API_KEY;
const BING_ENDPOINT = process.env.REACT_APP_IMAGE_SEARCH_ENDPOINT;

const defaults = {    
  "SafeSearch": "strict",
  "mkt": "en-GB",
  "count": 5,
  "aspect": "Square",
  //"imageType": "Clipart"
}

export function fetchImage(keyword, opts = {}) {

  if(isEmpty(keyword)) return Promise.resolve({});
  
  // Did we previously fetch it? If so return from local cache
  const previousResponse = retrieveItem(keyword);
  if(!isEmpty(previousResponse)) return Promise.resolve(JSON.parse(previousResponse))

  // Create a new request
  const params = Object.assign({}, defaults, opts, { q: encodeURIComponent(keyword) });

  // construct querystring from params
  const queryString = Object.keys(params)
    .reduce(function(a,k){a.push(`${k}=${params[k]}`);return a},[]).join('&')

  const url = `${BING_ENDPOINT}?${queryString}`;
  
  return fetch(url, {
    headers: {
      "Ocp-Apim-Subscription-Key": API_KEY,
      "Accept": "application/json"
    }
  })
  .then(response => response.json())
  .then(json => {
    storeItem(keyword, JSON.stringify(json));
    return Promise.resolve(json);
  });
}