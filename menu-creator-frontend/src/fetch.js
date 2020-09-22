function createNewCategory(data) {
  fetch(`${BACKEND_URL}/categories`, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => { if (!response.ok) {return response.json().then (data=> {throw data}) }
  return response.json() })
  .then(data => {
    console.log(data);
    const addedCategory = new Category(data.name, data.id);
    addedCategory.displayCategory();
  })
  .catch((error) => {
    window.alert(error)
  })
}
