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
  formButton.value = 'ADD'
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
    document.querySelector('#newDishName').value=''
    document.querySelector('#newDishDescription').value=''
    document.querySelector('#newDishPrice').value=''
  }

function removeCategory(id,res){
  if (res==='Category Deleted.') {
    Category.all_categories= Category.all_categories.filter(element=>element.id != id)
    let deletedCategory = document.querySelector(`#category_${id}`)
    deletedCategory.innerText=res;
    deletedCategory.className = 'deleted'
    // debugger
    setTimeout(function () {
    categoriesList.removeChild(deletedCategory)
  },2000)
    populateDynamicCategoryList();
  } else {
    window.alert(res);
  }
}

function removeItem(id,res){
  if (res==='Item Deleted.') {
    Dish.all_dishes= Dish.all_dishes.filter(element=>element.id != id)
    let deletedItem = document.querySelector(`#dish_${id}`)
    deletedItem.innerText=res;
    deletedItem.className = 'deleted'
    // debugger
    setTimeout(function () {
    dishesList.removeChild(deletedItem)
  },2000)
  } else {
    window.alert(res);
  }
}
