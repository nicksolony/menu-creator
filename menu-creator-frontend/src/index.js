const BACKEND_URL = 'http://localhost:3000'
const CATEGORIES_URL = BACKEND_URL+'/categories'
const ITEMS_URL = BACKEND_URL+'/items'
const MENUS_URL = BACKEND_URL+'/menus'
const categoriesList = document.querySelector('#categoriesList');
const addItemForm = document.querySelector('#newItemForm');
const hideItemButton = document.querySelector('#hideItemForm');
const addNewMenu = document.querySelector('#newMenuForm')
const showAllMenus = document.querySelector('#showAllMenus')
const menusList = document.querySelector('#menusList')
const menuPreview = document.querySelector('#menuPreview')
const closeMenu= document.querySelector('#closeMenu')
const printMenu = document.querySelector('.printMenu')

function populateDynamicCategoryList(itemId=0) {
  if (itemId) {

    let dropDown = document.getElementById(`dynamicDropdown${itemId}`)
    allCategories= sortCategories(dropDown)
    let defaultOption = document.createElement('option')
    let item  = Item.findItem('id',itemId)
    // debugger
    let category = Category.findCategory('id',item.category_id)
    defaultOption.value = category.id
    defaultOption.innerText=category.name
    dropDown.appendChild(defaultOption)
    allCategories= allCategories.filter(element=>element != category)
    allCategories.forEach((item) => {
      let option = document.createElement('option')
      option.value = item.id
      option.innerText=item.name
      dropDown.appendChild(option)
    });
  } else {
  let dropDown = document.getElementById(`dynamicDropdown`)
  sortCategories(dropDown).forEach((item) => {
    let option = document.createElement('option')
    option.value = item.id
    option.innerText=item.name
    dropDown.appendChild(option)
    }
)}
}

function sortCategories(dropDown) {
  if (dropDown) {
    while (dropDown.firstChild) {
         dropDown.removeChild(dropDown.firstChild);
     };
  }
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
return allCategories;
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
  li.className = 'itemCategory'
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

function showAddItemForm()
  {
    addItemForm.style.display='block'
    hideItemButton.style.display='inline'
    populateDynamicCategoryList()
    hideAddToMenuButtons()
  }

function hideAddItemForm()
  {
    addItemForm.style.display='none'
    hideItemButton.style.display='none'
    document.querySelector('#newItemName').value=''
    document.querySelector('#newItemDescription').value=''
    document.querySelector('#newItemPrice').value=''
    hideAddToMenuButtons()
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

// function removeItem(id,res){
//   if (res==='Item Deleted.') {
//     Item.all_items= Item.all_items.filter(element=>element.id != id)
//     let deletedItem = document.querySelector(`#item_${id}`)
//     deletedItem.innerText=res;
//     deletedItem.className = 'deleted'
//     debugger
//
//     let categoryUl = document.getElementById(`#category${id}Group`).children[0]
//     // debugger
//     setTimeout(function () {
//     categoryUl.removeChild(deletedItem)
//   },2000)
//   } else {
//     window.alert(res);
//   }
// }

function showAddMenuForm()
  {
    addNewMenu.style.display='block'
    showAllMenus.style.display='inline'
    menusList.style.display='none'
    const addItemButtons = Array.from(document.querySelectorAll('.addItemToMenu'))
    addItemButtons.forEach((item) => {
      item.style.display='block'
    });


  }


  function showAllMenusList()
    {
      addNewMenu.style.display='none'
      showAllMenus.style.display='none'
      menusList.style.display='block'
      hideAddToMenuButtons()
      // document.querySelector('#newItemName').value=''
      // document.querySelector('#newItemDescription').value=''
      // document.querySelector('#newItemPrice').value=''
    }

function hideAddToMenuButtons () {
  const addItemButtons = Array.from(document.querySelectorAll('.addItemToMenu'))
  addItemButtons.forEach((item) => {
    item.style.display='none'
  });
}
