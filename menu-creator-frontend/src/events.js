
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
  if (e.target.id === 'addCategory') {
    let tr = document.createElement('tr')
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
    dishTable.appendChild(tr)
  }
})
