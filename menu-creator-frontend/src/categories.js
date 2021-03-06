class Category {
  static all_categories = []

  constructor(name, id) {
    this.name = name;
    this.id = id;
    Category.all_categories.push(this)
  }

  static findCategory(key,value) {
    return (this.all_categories.find(element=>{return element[key]===value}))
  }

  displayCategory(){
    let li = document.createElement('li')
    li.className = 'categoryItem'
    li.id = `category_${this.id}`

    let link = document.createElement('a')
    link.setAttribute('href',`${BACKEND_URL}/categories/${this.id}`)
    link.innerText=`${this.name} `
    link.className = 'itemCategory'


    let deleteButton = document.createElement('button')
    deleteButton.className = `deleteCategory`
    deleteButton.id = this.id
    deleteButton.innerText = '✘'

    let editButton = document.createElement('button')
    editButton.className = `editCategory`
    editButton.id = this.id
    editButton.innerText = '✎'

    li.appendChild(link)
    li.appendChild(deleteButton)
    li.appendChild(editButton)
    return li;
    // categoriesList.appendChild(li);
  }

  static createNewCategory(form) {
    // const form = e.target;
    const newCategory = form.newCategory.value;
    const data = { name: newCategory };
    let row = form.parentNode
    row.parentNode.removeChild(row)
    createNewCategoryInDB(data)
  //   fetch(`${BACKEND_URL}/categories`, {
  //     method: 'POST', // or 'PUT'
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   })
  //   .then(response => { if (!response.ok) {return response.json().then (data=> {throw data}) }
  // return response.json() })
  //   .then(data => {
  //     console.log(data);
  //     const addedCategory = new Category(data.name, data.id);
  //     addedCategory.displayCategory();
  //   })
  //   .catch((error) => {
  //     window.alert(error)
  //   })
  }




  editCategory(){
    let editField = document.querySelector(`#category_${this.id}`)
    const editCategoryForm = document.createElement('form')
    editCategoryForm.id = 'editCategoryForm'

    const input = document.createElement('input')
    input.name = 'editCategory'
    input.value=`${this.name}`

    const formButton=document.createElement('input')
    formButton.type = 'submit'
    formButton.value = '✔'
    formButton.id = 'UpdateCategoryButton'
    editCategoryForm.appendChild(input)
    editCategoryForm.appendChild(formButton)
    editField.children[2].remove()
    editField.children[1].remove()
    editField.children[0].replaceWith(editCategoryForm)

  }

  updateCategory(formData) {
    updateCategoryInDB(this.id,formData.editCategory.value)
  }

}
