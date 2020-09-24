
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
  e.preventDefault();
  console.log(e.target.parentNode);} //this will show dishes from the category only

  if (e.target.className === 'deleteCategory') {
  e.preventDefault();
  let category = Category.findCategory('id',parseInt(e.target.id,10))
  category.deleteCategory()
  } // shold delete Category

  if (e.target.className === 'editCategory') {
  e.preventDefault();
  let category = Category.findCategory('id',parseInt(e.target.id,10))
  category.editCategory()
  }

  if (e.target.id === 'addDish') {
    showAddDishForm();
  };
})

window.addEventListener('submit',(e)=>{
  if (e.target.id === 'newCategoryForm') {
    e.preventDefault();
    Category.createNewCategory(e);
  }

  if (e.target.id === 'editCategoryForm') {
    e.preventDefault();
    let editedCategory = Category.findCategory('id',parseInt(e.target.parentNode.id.split('category_')[1],10))
    editedCategory.updateCategory(e.target);
  }
})
