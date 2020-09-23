const BACKEND_URL = 'http://localhost:3000'
const CATEGORIES_URL = BACKEND_URL+'/categories'
const DISHES_URL = BACKEND_URL+'/dishes'
const categoriesList = document.querySelector('#categoriesList');

// function loadCategories() {
//   Category.all_categories.forEach((item) => {
//     item.displayCategory()
//     console.log(item);
//   });
// };

function createAddCategoryButton()
{
  let li = document.createElement('li')
  li.className = 'dishCategory'
  const newCategoryForm = document.createElement('form')
  newCategoryForm.id = 'newCategoryForm'


  const input = document.createElement('input')
  input.name = 'newCategory'
  input.value=''
  input.placeholder = 'Add new category'

  const formButton=document.createElement('input')
  formButton.type = 'submit'
  formButton.value = 'Add Category'
  formButton.id = 'AddCategoryButton'
  newCategoryForm.appendChild(input)
  newCategoryForm.appendChild(formButton)

  li.appendChild(newCategoryForm)
  categoriesList.appendChild(li)
}
