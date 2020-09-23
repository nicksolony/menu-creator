
window.addEventListener('DOMContentLoaded',(e)=>{
  fetch (`${BACKEND_URL}/categories`)
    .then (resp=>resp.json())
    .then (data=> {
      Category.all_categories=[]
      data.forEach((item) => {
          let newCategory = new Category(item.name,item.id)
          newCategory.displayCategory()
      });
    });
})

window.addEventListener('click',(e)=>{
   // e.preventDefault();

  if (e.target.id === 'addCategory') {
    createAddCategoryButton();
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
