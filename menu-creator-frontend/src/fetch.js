function loadCategories() {
  fetch (`${CATEGORIES_URL}`)
    .then (resp=>resp.json())
    .then (data=> {
      Category.all_categories=[]
      data.forEach((item) => {
          let newCategory = new Category(item.name,item.id)
          let newRow = newCategory.displayCategory()
          categoriesList.appendChild(newRow);
          let categoryItems = item.items
          categoryItems.forEach((item) => {
            let newItem = new Item(item.name,item.id,item.description,item.price, item.category_id)
            newItem.addItemRow()
          });

      });
    });
}

// function loadItems() {
//   fetch (`${ITEMS_URL}`)
//     .then (resp=>resp.json())
//     .then (data=> {
//       Item.all_items=[]
//       data.forEach((item) => {
//           let newItem = new Item(item.name,item.id,item.description,item.price, item.category_id)
//           newItem.addItemRow()
//       });
//     });
// } FIXED!

function loadMenus() {
  fetch (`${MENUS_URL}`)
    .then (resp=>resp.json())
    .then (data=> {
      Menu.all_menus=[]
      data.forEach((menu) => {
          let items = []
          menu.menu_items.forEach((item) => {
            items.push(item.item_id);
          });
          Menu.showNewMenu(menu.name,menu.id,items)
          // let newMenu = new Menu(menu.name,menu.id,items)
          // let newRow = newMenu.displayMenu()
          // menusList.appendChild(newRow);
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
        const categoryUl = editField.parentNode
        editField.parentNode.removeChild(editField);
        if (categoryUl.childElementCount === 0) {
          let removedCategory = categoryUl.parentNode
          removedCategory.parentNode.removeChild(removedCategory)
        }
        itemCategory.appendChild(newRow);
      }
      // populateDynamicCategoryList();
    })
    .catch((error) => {
      window.alert(error)
    })
  }

function loadMenu(id) {
    fetch (`${MENUS_URL}/${id}`)
    .then(response => { if (!response.ok) {return response.json().then (data=> {throw data}) }
    return response.json() })
    .then(data => {
        if (!!data.id) {
          let items=[]
          if (!!data.menu_items) {
          data.menu_items.forEach((item) => {
                items.push(item.item_id);
              });
          }
          // let menu = Menu.findMenu(data.id);
          // if (menu) {
          //   menu.name = data.name
          //   menu.items = items
          //   return menu.displayMenu()
          // } else {
          Menu.showNewMenu(data.name, data.id, items)
          // }
          }
        })
        .catch((error) => {

          window.alert("Menu name can't be blank or already exists")
        })
      };

function createNewMenuInDB(data) {
    fetch(`${MENUS_URL}`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    // .then(response => { if (!response.ok) {return response.json().then (data=> {throw data}) }
    // return response.json() })
    // .then(data => {
    .then(response => { if (!response.ok) {return response.json().then (data=> {throw data}) }
    return response.json() })
    .then(data => {

      loadMenu(data.id)
      // Menu.showNewMenu(data.name, data.id)
      // const addedMenu = new Menu(data.name, data.id, data.items);
      // let newRow = addedMenu.displayMenu()
      // menusList.appendChild(newRow);
      showAllMenusList();
    })
    .catch((error) => {
      window.alert(error)
    })
  }

function deleteMenuFromDb(id) {
  fetch(`${MENUS_URL}/${id}`,{
      method: 'DELETE',
      headers: {
    'Content-Type': 'application/json'
  }})
    .then(res => {
        if (res.ok) {
            return Promise.resolve('Menu Deleted.');
        } else {
            return Promise.resolve("Can't delete Menu.");
        }
    })
    .then(res => {
      let deletedMenu = Menu.findMenu(parseInt(id,10))
      deletedMenu.removeMenu(res)
    });
}

function updateMenuInDB(id,formData) {
    fetch(`${MENUS_URL}/${id}`, {
      method: 'PUT', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => { if (!response.ok) {return response.json().then (data=> { console.log(error); throw data}) }
    return response.json() })
    .then(data => {
      let editField = document.querySelector(`#menu_${id}`)
      let editedMenu = Menu.findMenu(id)
      // Menu.all_menus[Menu.all_menus.indexOf(editedMenu
      // )].name = data.name;
      editedMenu.name = data.name
      let updatedItems=[]
       if (!!data.menu_items) {
       data.menu_items.forEach((item) => {
             updatedItems.push(item.item_id);
           });
       }
      // Menu.all_menus[Menu.all_menus.indexOf(editedMenu
      // )].items = data.updatedItems;
      editedMenu.items = updatedItems

      //   Menu.showNewMenu(data.name, data.id, items)


      editField.replaceWith(editedMenu.displayMenu())

      showAllMenusList()
      })
    .catch((error) => {
      window.alert(error)
    })
  }
