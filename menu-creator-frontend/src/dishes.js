class Dish {
  static all_dishes = []

  constructor(name, id, description,price,category_id) {
    this.name = name;
    this.id = id;
    this.description=description;
    this.price=price;
    this.category_id=category_id
    Dish.all_dishes.push(this)
  }

  static findDish(key,value) {
    return (this.all_dishes.find(element=>{return element[key]===value}))
  }

  displayDish(){
    let li = document.createElement('li')
    li.className = 'dishItem'
    li.id = `dish_${this.id}`

    let link = document.createElement('a')
    link.setAttribute('href',`${DISHES_URL}/${this.id}`)
    link.innerText=`${this.name} `
    link.className = 'dishLink'

    let categoryLink = document.createElement('a')
    categoryLink.setAttribute('href',`${CATEGORIES_URL}/${this.category_id}`)
    categoryLink.innerText=`${Category.findCategory('id',this.category_id).name}`
    categoryLink.className = 'dishCategoryLink'


    let deleteButton = document.createElement('button')
    deleteButton.className = `deleteDish`
    deleteButton.id = this.id
    deleteButton.innerText = '✘'

    let editButton = document.createElement('button')
    editButton.className = `editDish`
    editButton.id = this.id
    editButton.innerText = '✎'

    li.appendChild(link)
    li.appendChild(categoryLink)
    li.appendChild(editButton)
    li.appendChild(deleteButton)
    return li;
    // dishesList.appendChild(li);
  }

  static createNewDish(form) {
    // const form = e.target;
    const newDishName = form.name.value;
    const newDishDescription = form.description.value;
    const newDishPrice = form.price.value;
    const newDishCategory = form.category.value;
    const data = { name: newDishName, description: newDishDescription, price: newDishPrice, category_id: newDishCategory };
    hideAddDishForm();
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

  deleteDish(){
    Dish.all_dishes= Dish.all_dishes.filter(element=>element.id != this.id)
    deleteDishFromDb(this.id) //remove value from DB
    let deletedDish = document.querySelector(`#dish_${this.id}`)
    dishesList.removeChild(deletedDish)
  }

  editDish(){
    let editField = document.querySelector(`#dish_${this.id}`)
    const editDishForm = document.createElement('form')
    editDishForm.id = 'editDishForm'

    const input = document.createElement('input')
    input.name = 'editDish'
    input.value=`${this.name}`

    const formButton=document.createElement('input')
    formButton.type = 'submit'
    formButton.value = '✔'
    formButton.id = 'UpdateDishButton'
    editDishForm.appendChild(input)
    editDishForm.appendChild(formButton)
    editField.children[2].remove()
    editField.children[1].remove()
    editField.children[0].replaceWith(editDishForm)
        // console.log(editField);

    // deleteDishFromDb(dish.id)
    // let deletedDish = document.querySelector(`#dish_${dish.id}`)
    // dishesList.removeChild(deletedDish)
  }

  updateDish(formData) {
    updateDishInDB(this.id,formData.editDish.value)
  }
}
