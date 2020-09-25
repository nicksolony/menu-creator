
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
  console.log(e.target.parentNode);} //this will show dishes from the category only

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

  if (e.target.id === 'addDish') {
    showAddDishForm();
  };

  if (e.target.id === 'hideDish') {
    hideAddDishForm();
  };
})

window.addEventListener('submit',(e)=>{
  e.preventDefault();
  if (e.target.id === 'newCategoryForm') {
    Category.createNewCategory(e.target);
  }

  if (e.target.id === 'editCategoryForm') {
    console.log('test');
    let editedCategory = Category.findCategory('id',parseInt(e.target.parentNode.id.split('category_')[1],10))
    editedCategory.updateCategory(e.target);
  }

  if (e.target.id === 'addDishForm') {
    console.log('new dish should be created');
    Dish.createNewDish(e.target)
  }
})
