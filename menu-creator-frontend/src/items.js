class Item {
  static all_items = []

  constructor(name, id, description,price,category_id) {
    this.name = name;
    this.id = id;
    this.description=description;
    this.price=price;
    this.category_id=category_id
    Item.all_items.push(this)
    // Item.all_items.sort((a, b) => (Category.findCategory('id',a.category_id).name > Category.findCategory('id',b.category_id).name) ? 1 : (Category.findCategory('id',a.category_id).name === Category.findCategory('id',b.category_id).name) ? ((a.name > b.name) ? 1 : -1) : -1 )
  }

  static findItem(key,value) {
    return (this.all_items.find(element=>{return element[key]===value}))
  }

  findOrCreateItemCategory() {
    let categoryLi = document.getElementById(`#category${this.category_id}Group`)
    if (!categoryLi) {
    let categoryLi=document.createElement('li')
    categoryLi.id = `#category${this.category_id}Group`
    categoryLi.innerText = Category.findCategory('id', this.category_id).name
    let ul = document.createElement('ul')
    categoryLi.appendChild(ul)
    itemsList.appendChild(categoryLi);
    return ul;
  } else {
    let ul = document.getElementById(`#category${this.category_id}Group`).children[0]
    return ul;
  }
  }



  displayItem(){
    let li = document.createElement('li')
    li.className = 'item'
    li.id = `item_${this.id}`

    let link = document.createElement('a')
    link.setAttribute('href',`${ITEMS_URL}/${this.id}`)
    link.innerText=`${this.name} `
    link.className = 'itemLink'

    // let categoryLink = document.createElement('a')
    // categoryLink.setAttribute('href',`${CATEGORIES_URL}/${this.category_id}`)
    // categoryLink.innerText=`${Category.findCategory('id',this.category_id).name}`
    // categoryLink.className = 'itemCategoryLink'


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
  addItemRow() {
    let newRow = this.displayItem()
    // itemsList.appendChild(newRow);
    let itemCategory = this.findOrCreateItemCategory();
    itemCategory.appendChild(newRow);
  }
  static createNewItem(form) {
    // const form = e.target;
    const newItemName = form.name.value;
    const newItemDescription = form.description.value;
    const newItemPrice = form.price.value;
    const newItemCategory = form.category.value;
    const data = { name: newItemName, description: newItemDescription, price: newItemPrice, category_id: newItemCategory };
    createNewItemInDB(data)
  //   fetch(`${BACKEND_URL}/items`, {
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
  //     const addedItem = new Item(data.name, data.id);
  //     addedItem.displayItem();
  //   })
  //   .catch((error) => {
  //     window.alert(error)
  //   })
  }

  removeItem(res){
    if (res==='Item Deleted.') {
    Item.all_items= Item.all_items.filter(element=>element.id != this.id)
    // deleteItemFromDb(this.id) //remove value from DB
    // let deletedItem = document.querySelector(`#item_${this.id}`)
    // itemsList.removeChild(deletedItem)
    let deletedItem = document.querySelector(`#item_${this.id}`)
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

    let editField = document.querySelector(`#item_${this.id}`)
     // debugger
    const editItemForm = document.createElement('form')
    editItemForm.id = 'editItemForm'
    let editTable = document.createElement('table')
    let editTableHeader =document.createElement('thead')
    let editTableHeaderLabel =document.createElement('th')
    const labelName = document.createElement('label')
    labelName.innerText='Name:'
    let editTableHeaderValue =document.createElement('th')
    const inputName = document.createElement('input')
    inputName.name = 'editItemName'
    inputName.value=`${this.name}`

    const formButton=document.createElement('input')
    formButton.type = 'submit'
    formButton.value = '✔'
    formButton.id = 'UpdateItemButton'

    editTableHeaderLabel.appendChild(labelName)
    editTableHeader.appendChild(editTableHeaderLabel)
    editTableHeaderValue.appendChild(inputName)
    editTableHeaderValue.appendChild(formButton)
    editTableHeader.appendChild(editTableHeaderValue)
    editTable.appendChild(editTableHeader)



    let editTableRow1 = document.createElement('tr')

    let editTableRow1Label = document.createElement('td')
    let labelDescription = document.createElement('label')
    labelDescription.innerText = 'Description:'

    let editTableRow1Value = document.createElement('td')
    const inputDescription = document.createElement('textarea')
    inputDescription.name = 'editItemDescrption'
    inputDescription.value=`${this.description}`
    inputDescription.cols="25"
    inputDescription.rows="5"
    editTableRow1Label.appendChild(labelDescription)
    editTableRow1Value.appendChild(inputDescription)
    editTableRow1.appendChild(editTableRow1Label)
    editTableRow1.appendChild(editTableRow1Value)
    editTable.appendChild(editTableRow1)

    let editTableRow2 = document.createElement('tr')

    let editTableRow2Label = document.createElement('td')
    let labelPrice = document.createElement('label')
    labelPrice.innerText = 'Price:'

    let editTableRow2Value = document.createElement('td')
    const inputPrice = document.createElement('input')
    inputPrice.name = 'editItemPrice'
    inputPrice.value=`${this.price}`
    inputPrice.type='number'
    editTableRow2Label.appendChild(labelPrice)
    editTableRow2Value.appendChild(inputPrice)
    editTableRow2.appendChild(editTableRow2Label)
    editTableRow2.appendChild(editTableRow2Value)
    editTable.appendChild(editTableRow2)

    let editTableRow3 = document.createElement('tr')

    let editTableRow3Label = document.createElement('td')
    let labelCategory = document.createElement('label')
    labelCategory.innerText = 'Category:'


    let editTableRow3Value = document.createElement('td')
    const inputCategory = document.createElement('select')
    inputCategory.id = `dynamicDropdown${this.id}`
    inputCategory.name = 'editItemCategory'

    // const selectedValue = document.createElement('option')
    // selectedValue.innerText=`${Category.findCategory(`id`,this.category_id).name}`
    // inputCategory.appendChild(selectedValue)
    editTableRow3Label.appendChild(labelCategory)
    editTableRow3Value.appendChild(inputCategory)
    editTableRow3.appendChild(editTableRow3Label)
    editTableRow3.appendChild(editTableRow3Value)
    editTable.appendChild(editTableRow3)
    // const inputPrice = document.createElement('input')
    // inputPrice.name = 'editItemPrice'
    // inputPrice.value=`${this.price}`
    // const inputCategory = document.createElement('input')
    // inputCategory.name = 'editItemCategory'
    // inputCategory.value=`${Category.findCategory('id',this.category_id).name}`
    //
    //
    // const formButton=document.createElement('input')
    // formButton.type = 'submit'
    // formButton.value = '✔'
    // formButton.id = 'UpdateItemButton'
    editItemForm.appendChild(editTable)
    // editItemForm.appendChild(inputDescription)
    // editItemForm.appendChild(inputPrice)
    // editItemForm.appendChild(inputCategory)
    // editItemForm.appendChild(formButton)
    editField.children[2].remove()
    editField.children[1].remove()
    editField.children[0].replaceWith(editItemForm)
    populateDynamicCategoryList(this.id)
        // console.log(editField);

    // deleteItemFromDb(item.id)
    // let deletedItem = document.querySelector(`#item_${item.id}`)
    // itemsList.removeChild(deletedItem)
  }

  updateItem(formData) {
    updateItemInDB(this.id,formData)
  }

  static removeAllItems() {
    while (itemsList.firstChild) {
         itemsList.removeChild(itemsList.firstChild);
     }

  }
  static showAllItems(){
    Item.removeAllItems()
    Item.all_items.forEach((item) => {
    item.addItemRow()
  })
}

  static showItemsByCategory(categoryId){
    Item.removeAllItems()
    let filteredItems = Item.all_items.filter(item=> item.category_id == categoryId)
    filteredItems.forEach((item) => {
    item.addItemRow()
    })
  }
}
