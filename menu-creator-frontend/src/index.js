const BACKEND_URL = 'http://localhost:3000'
const dishTable = document.querySelector('#dishSelectionTable');

// function loadCategories() {
//   Category.all_categories.forEach((item) => {
//     item.displayCategory()
//     console.log(item);
//   });
// };

function createAddCategoryButton() {let tr = document.createElement('tr')
let td = document.createElement('td')
td.className = 'dishCategory'
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

td.appendChild(newCategoryForm)
tr.appendChild(td)
dishTable.appendChild(tr)}
