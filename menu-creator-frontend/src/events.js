
window.addEventListener('DOMContentLoaded',(e)=>{
  loadCategories();
  // loadItems();
  loadMenus();
})

window.addEventListener('click',(e)=>{


  if (e.target.id === 'addCategory') {
    showAddCategoryForm();
  };

  if (e.target.className === 'itemCategory') {  //this will show itemes from the category only
    e.preventDefault();
    if (e.target.parentNode.id == 'showAll') {
      Item.showAllItems()
    } else {
      let categoryId = parseInt(e.target.parentNode.id.split('_')[1],10)
      Item.showItemsByCategory(categoryId)
    }
  }

  if (e.target.className === 'deleteCategory') {
  deleteCategoryFromDb(e.target.id)

} // should delete Category

  if (e.target.className === 'editCategory') {

  let category = Category.findCategory('id',parseInt(e.target.id,10))
  category.editCategory()
  }

  if (e.target.className === 'editItem') {
    let item = Item.findItem('id',parseInt(e.target.id,10))
    item.editItem()
  }

  if (e.target.id === 'addItem') {
    showAddItemForm();
  };

  if (e.target.id === 'hideItemForm') {
    hideAddItemForm();
  };

  if (e.target.className === 'deleteItem') {

  deleteItemFromDb(e.target.id)

  }

  if (e.target.className === 'itemLink') {
    e.preventDefault();
    let item = Item.findItem('id',parseInt(e.target.href.split('http://localhost:3000/items/')[1],10))
    item.showItem();
  }

  if (e.target.className === 'HideInfoButton') {
    e.preventDefault();
    const row = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
    const item = Item.findItem('id',parseInt(row.id.split('item_')[1]))
    row.parentNode.replaceChild(item.displayItem(),row)
  }

  if (e.target.id === 'addNewMenu') {
    showAddMenuForm()
  }

  if (e.target.id === 'showAllMenus') {
    showAllMenusList()
  }

  if (e.target.className === 'menuLink') {
    e.preventDefault();
    let menu = Menu.findMenu(parseInt(e.target.href.split('http://localhost:3000/menus/')[1],10))
    menu.showMenu();
  }

  if (e.target === closeMenu) {
    Menu.hideMenu();
  }

  if (e.target===printMenu) {
    menu = document.querySelector('#menuPreview')
    Menu.printMenu(menu);
  }

  if (e.target.className === 'addItemToMenu') {
    let item = Item.findItem('id',parseInt(e.target.id,10))
    item.addItemToMenu()
  }

  if (e.target.className === 'addItemToEditMenu') {
    let item = Item.findItem('id',parseInt(e.target.id,10))
    item.addItemToEditMenu()
  }

  if (e.target.className === 'deleteMenu') {
    deleteMenuFromDb(e.target.id)
  }

  if (e.target.className === 'editMenu') {
    let menu = Menu.findMenu(parseInt(e.target.id,10))
    menu.editMenu()
  }

  if (e.target.className === 'removeItemFromMenu') {
    e.preventDefault();
    let item = e.target.parentNode
    let category = item.parentNode
    category.removeChild(item)
    if (category.childElementCount === 0) {
      let removedCategory = category.parentNode
      removedCategory.parentNode.removeChild(removedCategory)
    }
  }
  // search functionality added during project review
  
  // if (e.target.id === 'searchItem') {
  //   let searchItem = document.querySelector('#searchItem').value;
  //   let item = Item.findItem('name',searchItem);
  //   console.log(item);
  // }

})

window.addEventListener('submit',(e)=>{

  e.preventDefault();
  if (e.target.id === 'newCategoryForm') {
    Category.createNewCategory(e.target);
  }

  if (e.target.id === 'editCategoryForm') {
    let editedCategory = Category.findCategory('id',parseInt(e.target.parentNode.id.split('category_')[1],10))
    editedCategory.updateCategory(e.target);
  }

  if (e.target.id === 'addItemForm') {
    Item.createNewItem(e.target)
    hideAddToMenuButtons()
  }

  if (e.target.id === 'editItemForm') {
    let editedItem = Item.findItem('id',parseInt(e.target.parentNode.id.split('item_')[1],10))
    editedItem.updateItem(e.target)
    hideAddToMenuButtons()
  }

  if (e.target.id === 'addNewMenuForm') {
    Menu.createNewMenu(e.target)
  }

  if (e.target.className === 'editMenuForm') {
    let editedMenu = Menu.findMenu(parseInt(e.target.id.split('editMenu_')[1],10))
    editedMenu.updateMenu(e.target)
    hideAddToEditMenuButtons()
    showAllMenusList()
  }



})
