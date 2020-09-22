fetch (`${BACKEND_URL}/categories`)
  .then (resp=>resp.json())
  .then (data=>console.log(data));
