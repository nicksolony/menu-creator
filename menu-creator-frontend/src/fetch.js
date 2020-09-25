function loadCategories() {
  fetch (`${CATEGORIES_URL}`)
    .then (resp=>resp.json())
    .then (data=> {
      Category.all_categories=[]
      data.forEach((item) => {
          let newCategory = new Category(item.name,item.id)
          let newRow = newCategory.displayCategory()
          categoriesList.appendChild(newRow);
      });
    });
}

function loadDishes() {
  fetch (`${DISHES_URL}`)
    .then (resp=>resp.json())
    .then (data=> {
      Dish.all_dishes=[]
      data.forEach((item) => {
          let newDish = new Dish(item.name,item.id,item.description,item.price, item.category_id)
          let newRow = newDish.displayDish()
          dishesList.appendChild(newRow);
      });
    });
}

function createNewCategoryInDB(data) {
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
    const addedCategory = new Category(data.name, data.id);
    let newRow = addedCategory.displayCategory();
    categoriesList.appendChild(newRow);
    populateDynamicCategoryList();
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
            return Promise.resolve("Can't delete category.");
        }
    })
    .then(res => removeCategory(id,res));
}

function updateCategoryInDB(id,name) {
    fetch(`${CATEGORIES_URL}/${id}`, {
      method: 'PUT', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: name}),
    })
    .then(response => { if (!response.ok) {return response.json().then (data=> { console.log(error); throw data}) }
    return response.json() })
    .then(data => {
      let editField = document.querySelector(`#category_${id}`)
      let editedCategory = Category.findCategory('id',id)
      Category.all_categories[Category.all_categories.indexOf(editedCategory
)].name = name
      editField.parentNode.replaceChild(editedCategory.displayCategory(), editField);
      populateDynamicCategoryList();
    })
    .catch((error) => {
      window.alert(error)
    })
  }

function createNewDishInDB(data) {
  fetch(`${DISHES_URL}`, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => { if (!response.ok) {return response.json().then (data=> {throw data}) }
  return response.json() })
  .then(data => {
    const addedDish = new Dish(data.name, data.id, data.description, data.price, data.category_id);
    let newRow = addedDish.displayDish();
    dishesList.appendChild(newRow);
    hideAddDishForm();
  })
  .catch((error) => {
    window.alert(error)
  })
}

function deleteItemFromDb(id) {
  fetch(`${DISHES_URL}/${id}`,{
      method: 'DELETE',
      headers: {
    'Content-Type': 'application/json'
  }})
    .then(res => {
        if (res.ok) {
            return Promise.resolve('Item Deleted.');
        } else {
            return Promise.resolve("Can't delete item.");
        }
    })
    .then(res => removeItem(id,res));
}
