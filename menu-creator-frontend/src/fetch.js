function createNewCategory(data) {
  fetch(`${CATEGORIES_URL}`, {
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

function deleteCategoryFromDb(id) {
  fetch(`${CATEGORIES_URL}/${id}`,{
      method: 'DELETE',
      headers: {
    'Content-Type': 'application/json'
  }})
    .then(res => {
        if (res.ok) {
            return Promise.resolve('Category Deleted.');
        } else {
            return Promise.reject('An error occurred.');
        }
    })
    .then(res => window.alert(res));
}
