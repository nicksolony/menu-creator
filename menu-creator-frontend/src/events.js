
window.addEventListener('DOMContentLoaded',(e)=>{
  loadCategories()
  loadDishes()
})

window.addEventListener('click',(e)=>{
   // e.preventDefault();

  if (e.target.id === 'addCategory') {
    showAddCategoryForm();
  };

  if (e.target.className === 'dishCategory') {
  // e.preventDefault();
  console.log(e.target.parentNode);
  } //this will show dishes from the category only

  if (e.target.className === 'deleteCategory') {
  // e.preventDefault();
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
  let item = Dish.findDish('id',parseInt(e.target.id,10))
  item.editItem()
  }

  if (e.target.id === 'addDish') {
    showAddDishForm();
  };

  if (e.target.id === 'hideDishForm') {
    hideAddDishForm();
  };

  if (e.target.className === 'deleteItem') {
  // e.preventDefault();
  deleteItemFromDb(e.target.id)
  // let category = Category.findCategory('id',parseInt(e.target.id,10))
  // category.deleteCategory()
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

  if (e.target.id === 'addDishForm') {
    Dish.createNewDish(e.target)
  }
})
