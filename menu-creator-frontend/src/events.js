
window.addEventListener('DOMContentLoaded',(e)=>{
  loadCategories()
  loadItems()
})

window.addEventListener('click',(e)=>{
   // e.preventDefault();

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
  // let category = Category.findCategory('id',parseInt(e.target.id,10))
  // category.deleteCategory()
  } // shold delete Category

  if (e.target.className === 'editCategory') {
  // e.preventDefault();
  let category = Category.findCategory('id',parseInt(e.target.id,10))
  category.editCategory()
  }

  if (e.target.className === 'editItem') {
  // e.preventDefault();
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
  // e.preventDefault();
  deleteItemFromDb(e.target.id)
  // let category = Category.findCategory('id',parseInt(e.target.id,10))
  // category.deleteCategory()
  }

  if (e.target.className === 'itemLink') {
    e.preventDefault();
    let item = Item.findItem('id',parseInt(e.target.href.split('http://localhost:3000/items/')[1],10))
    item.showItem();

  }

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
  }

  if (e.target.id === 'editItemForm') {
    let editedItem = Item.findItem('id',parseInt(e.target.parentNode.id.split('item_')[1],10))
    editedItem.updateItem(e.target)
  }

})
