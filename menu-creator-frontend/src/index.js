const BACKEND_URL = 'http://localhost:3000/'

fetch (`${BACKEND_URL}/categories`)
  .then (resp=>resp.json())
  .then (data=>console.log(data));
