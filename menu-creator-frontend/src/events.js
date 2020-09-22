
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

  if (e.target.id === 'AddCategoryButton') {
    e.preventDefault();
    Category.createNewCategory(e);
  }
  if (e.target.parentNode.className === 'dishCategory') {
  e.preventDefault();
  console.log(e.target.parentNode);} // no action for now
  //
  // console.log(e.target.parentNode);
})
