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

function loadItems() {
  fetch (`${ITEMS_URL}`)
    .then (resp=>resp.json())
    .then (data=> {
      Item.all_items=[]
      data.forEach((item) => {
          let newItem = new Item(item.name,item.id,item.description,item.price, item.category_id)
          let newRow = newItem.displayItem()
          // itemsList.appendChild(newRow);
          let itemCategory = newItem.findOrCreateItemCategory();
          itemCategory.appendChild(newRow);

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

function createNewItemInDB(data) {
  fetch(`${ITEMS_URL}`, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => { if (!response.ok) {return response.json().then (data=> {throw data}) }
  return response.json() })
  .then(data => {
    const addedItem = new Item(data.name, data.id, data.description, data.price, data.category_id);
    let itemCategory = addedItem.findOrCreateItemCategory();
    let newRow = addedItem.displayItem();
    itemCategory.appendChild(newRow);
    hideAddItemForm();
  })
  .catch((error) => {
    window.alert(error)
  })
}

function deleteItemFromDb(id) {
  fetch(`${ITEMS_URL}/${id}`,{
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
    .then(res => {
      let deletedItem = Item.findItem('id',parseInt(id,10))
      deletedItem.removeItem(res)
    });
}

function updateItemInDB(id,formData) {
    fetch(`${ITEMS_URL}/${id}`, {
      method: 'PUT', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.editItemName.value,
        description: formData.editItemDescrption.value,
        price: formData.editItemPrice.value,
        category_id: formData.editItemCategory.value
        }),
    })
    .then(response => { if (!response.ok) {return response.json().then (data=> { console.log(error); throw data}) }
    return response.json() })
    .then(data => {
      let editField = document.querySelector(`#item_${id}`)
      let editedItem = Item.findItem('id',id)
      const oldCategory = editedItem.category_id
      debugger
      // for (const [key,value] of Object.entries(editedItem)) {
      //   Item.all_items[Item.all_items.indexOf(editedItem)].key = data.key
      // }

      // Item.all_items[Item.all_items.indexOf(editedItem
      // )] = data;


      Item.all_items[Item.all_items.indexOf(editedItem
      )].name = data.name;
      Item.all_items[Item.all_items.indexOf(editedItem
      )].description = data.description;
      Item.all_items[Item.all_items.indexOf(editedItem
      )].price = data.price;
      Item.all_items[Item.all_items.indexOf(editedItem
      )].category_id = data.category_id;


      if (oldCategory === editedItem.category_id) {
        editField.parentNode.replaceChild(editedItem.displayItem(), editField);
      } else {
        let itemCategory = editedItem.findOrCreateItemCategory();
        let newRow = editedItem.displayItem();
        editField.parentNode.removeChild(editField);
        itemCategory.appendChild(newRow);
      }
      // populateDynamicCategoryList();
    })
    .catch((error) => {
      window.alert(error)
    })
  }
