const BACKEND_URL = 'http://localhost:3000/'
const dishTable = document.querySelector('#dishSelectionTable');
const AddCategoryButton = document.

function loadCategories() {
  Category.all_categories.forEach((item) => {
    item.displayCategory()
    console.log(item);
  });
};
