class Dish {
  static all_dishes = []

  constructor(name, id, description,price,category_id) {
    this.name = name;
    this.id = id;
    this.description=description;
    this.price=price;
    this.category_id=category_id
    Dish.all_dishes.push(this)
    // Dish.all_dishes.sort((a, b) => (Category.findCategory('id',a.category_id).name > Category.findCategory('id',b.category_id).name) ? 1 : (Category.findCategory('id',a.category_id).name === Category.findCategory('id',b.category_id).name) ? ((a.name > b.name) ? 1 : -1) : -1 )
  }

  static findDish(key,value) {
    return (this.all_dishes.find(element=>{return element[key]===value}))
  }

  findOrCreateItemCategory() {
    let categoryLi = document.getElementById(`#category${this.category_id}Group`)
    if (!categoryLi) {
    let categoryLi=document.createElement('li')
    categoryLi.id = `#category${this.category_id}Group`
    categoryLi.innerText = Category.findCategory('id', this.category_id).name
    let ul = document.createElement('ul')
    categoryLi.appendChild(ul)
    dishesList.appendChild(categoryLi);
    return ul;
  } else {
    let ul = document.getElementById(`#category${this.category_id}Group`).children[0]
    return ul;
  }
  }



  displayDish(){
    let li = document.createElement('li')
    li.className = 'dishItem'
    li.id = `dish_${this.id}`

    let link = document.createElement('a')
    link.setAttribute('href',`${DISHES_URL}/${this.id}`)
    link.innerText=`${this.name} `
    link.className = 'dishLink'

    // let categoryLink = document.createElement('a')
    // categoryLink.setAttribute('href',`${CATEGORIES_URL}/${this.category_id}`)
    // categoryLink.innerText=`${Category.findCategory('id',this.category_id).name}`
    // categoryLink.className = 'dishCategoryLink'


    let deleteButton = document.createElement('button')
    deleteButton.className = `deleteItem`
    deleteButton.id = this.id
    deleteButton.innerText = '✘'

    let editButton = document.createElement('button')
    editButton.className = `editItem`
    editButton.id = this.id
    editButton.innerText = '✎'

    li.appendChild(link)
    // li.appendChild(categoryLink)
    li.appendChild(editButton)
    li.appendChild(deleteButton)
    return li;
    // ul.appendChild(li);
  }

  static createNewDish(form) {
    // const form = e.target;
    const newDishName = form.name.value;
    const newDishDescription = form.description.value;
    const newDishPrice = form.price.value;
    const newDishCategory = form.category.value;
    const data = { name: newDishName, description: newDishDescription, price: newDishPrice, category_id: newDishCategory };
    createNewDishInDB(data)
  //   fetch(`${BACKEND_URL}/dishes`, {
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
  //     const addedDish = new Dish(data.name, data.id);
  //     addedDish.displayDish();
  //   })
  //   .catch((error) => {
  //     window.alert(error)
  //   })
  }

  removeItem(res){
    if (res==='Item Deleted.') {
    Dish.all_dishes= Dish.all_dishes.filter(element=>element.id != this.id)
    // deleteItemFromDb(this.id) //remove value from DB
    // let deletedDish = document.querySelector(`#dish_${this.id}`)
    // dishesList.removeChild(deletedDish)
    let deletedItem = document.querySelector(`#dish_${this.id}`)
    deletedItem.innerText=res;
    deletedItem.className = 'deleted'
    let categoryUl = document.getElementById(`#category${this.category_id}Group`).children[0]
    setTimeout(function () {
    categoryUl.removeChild(deletedItem)
    if (categoryUl.childElementCount === 0) {
      let removedCategory = categoryUl.parentNode
      removedCategory.parentNode.removeChild(removedCategory)
    }
  },1000);
  } else {
    window.alert(res);
  }
}



  editItem(){
    debugger
    let editField = document.querySelector(`#item_${this.id}`)
    const editItemForm = document.createElement('form')
    editItemForm.id = 'editItemForm'

    const input = document.createElement('input')
    input.name = 'editItem'
    input.value=`${this.name}`

    const formButton=document.createElement('input')
    formButton.type = 'submit'
    formButton.value = '✔'
    formButton.id = 'UpdateItemButton'
    editItemForm.appendChild(input)
    editItemForm.appendChild(formButton)
    editField.children[2].remove()
    editField.children[1].remove()
    editField.children[0].replaceWith(editItemForm)
        // console.log(editField);

    // deleteItemFromDb(dish.id)
    // let deletedDish = document.querySelector(`#dish_${dish.id}`)
    // dishesList.removeChild(deletedDish)
  }

  updateDish(formData) {
    updateDishInDB(this.id,formData.editItem.value)
  }
}
