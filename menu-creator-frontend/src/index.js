const BACKEND_URL = 'http://localhost:3000'
const CATEGORIES_URL = BACKEND_URL+'/categories'
const DISHES_URL = BACKEND_URL+'/dishes'
const categoriesList = document.querySelector('#categoriesList');
const addDishForm = document.querySelector('#newDishForm');

function populateDynamicCategoryList() {
  let dropDown = document.querySelector('#dynamicDropdown')
  while (dropDown.firstChild) {
       dropDown.removeChild(dropDown.firstChild);
   };
let allCategories = Category.all_categories.sort(function(a, b) {
  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
});

  allCategories.forEach((item) => {
    let option = document.createElement('option')
    option.value = item.id
    option.innerText=item.name
    dropDown.appendChild(option)
  });

}

// function loadCategories() {
//   Category.all_categories.forEach((item) => {
//     item.displayCategory()
//     console.log(item);
//   });
// };

function showAddCategoryForm()
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

function showAddDishForm()
  {
    addDishForm.style.display='block'
    populateDynamicCategoryList()
  }

function hideAddDishForm()
  {
    addDishForm.style.display='none'
  }
