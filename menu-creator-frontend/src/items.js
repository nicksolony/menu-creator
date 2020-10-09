class Item {
  static all_items = []

  constructor(name, id, description,price,category_id) {
    this.name = name;
    this.id = id;
    this.description=description;
    this.price=price;
    this.category_id=category_id
    Item.all_items.push(this)
    
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


    let addToMenuButton = document.createElement('button')
    addToMenuButton.className = `addItemToMenu`
    addToMenuButton.id = this.id
    addToMenuButton.innerText = '▶'
    addToMenuButton.style ="align: right;"
    addToMenuButton.style ='display:none;'

    let addToEditMenuButton = document.createElement('button')
    addToEditMenuButton.className = `addItemToEditMenu`
    addToEditMenuButton.id = this.id
    addToEditMenuButton.innerText = '▶'
    addToEditMenuButton.style ="right;"
    addToEditMenuButton.style ='display:none;'


    let deleteButton = document.createElement('button')
    deleteButton.className = `deleteItem`
    deleteButton.id = this.id
    deleteButton.innerText = '✘'

    deleteButton.style ="right;"

    let editButton = document.createElement('button')
    editButton.className = `editItem`
    editButton.id = this.id
    editButton.innerText = '✎'
    editButton.style ="right;"

    li.appendChild(link)
    li.appendChild(addToEditMenuButton)
    li.appendChild(addToMenuButton)
    li.appendChild(deleteButton)
    li.appendChild(editButton)
    return li;

  }

  addItemRow() {
    let newRow = this.displayItem()

    let itemCategory = this.findOrCreateItemCategory();
    itemCategory.appendChild(newRow);
  }

  static createNewItem(form) {

    const newItemName = form.name.value;
    const newItemDescription = form.description.value;
    const newItemPrice = form.price.value;
    const newItemCategory = form.category.value;
    const data = { name: newItemName, description: newItemDescription, price: newItemPrice, category_id: newItemCategory };
    createNewItemInDB(data)

  }

  removeItem(res){
    if (res==='Item Deleted.') {
    Item.all_items= Item.all_items.filter(element=>element.id != this.id)

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
    let editItemForm = document.getElementById('addItemForm').cloneNode(true)

    editItemForm.id = 'editItemForm'

    const inputName = editItemForm.querySelector('#newItemName')
    inputName.name = 'editItemName'
    inputName.value=`${this.name}`

    const formButton=editItemForm.querySelector('#submit')
    formButton.value = 'Update'
    const inputDescription = editItemForm.querySelector('#newItemDescription')
    inputDescription.name = 'editItemDescrption'

    inputDescription.value=`${this.description}`
    inputDescription.cols="25"
    inputDescription.rows="5"
    const inputPrice = editItemForm.querySelector('#newItemPrice')
    inputPrice.name = 'editItemPrice'

    inputPrice.value=`${this.price}`
    const inputCategory = editItemForm.querySelector('#dynamicDropdown')
    inputCategory.id = `dynamicDropdown${this.id}`
    inputCategory.name = 'editItemCategory'
    editField.children[2].remove()
    editField.children[1].remove()
    editField.children[0].replaceWith(editItemForm)
    populateDynamicCategoryList(this.id)
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

  showItem(){

    const showField = document.querySelector(`#item_${this.id}`)
    const showItemForm = document.getElementById('addItemForm').cloneNode(true)

    showItemForm.id = 'showItemForm'
    const showNameField = showItemForm.querySelector('#newItemName')
    const showName = document.createElement('span')
    showName.name = 'showItemName'
    showName.innerText=`${this.name}`
    showNameField.parentNode.replaceChild(showName,showNameField)

    const showDescriptionField = showItemForm.querySelector('#newItemDescription')
    const showDescription = document.createElement('span')
    showDescription.name = 'showItemDescrption'
    showDescription.innerText=`${this.description}`
    showDescription.setAttribute('style',"width:250px;")
    showDescriptionField.parentNode.replaceChild(showDescription,showDescriptionField)

    const showPriceField = showItemForm.querySelector('#newItemPrice')
    const showPrice = document.createElement('span')
    showPrice.name = 'showItemPrice'
    showPrice.innerText=`${this.price}`
    showPriceField.parentNode.replaceChild(showPrice,showPriceField)

    const showCategoryField = showItemForm.querySelector('#dynamicDropdown')
    const categoryRow = showCategoryField.parentNode.parentNode
    categoryRow.parentNode.removeChild(categoryRow)
    const formButton=showItemForm.querySelector('#submit')
    formButton.value = 'Hide Info'
    formButton.className = 'HideInfoButton'

    showField.children[2].remove()
    showField.children[1].remove()
    showField.children[0].replaceWith(showItemForm)

  }

  findOrCreateItemCategoryInNewMenu(itemsLocation = menuItemsList) {
    // debugger
    let categoryLi = itemsLocation.querySelector(`#menuCategory${this.category_id}`)
    if (!categoryLi) {
    categoryLi=document.createElement('li')
    categoryLi.id = `menuCategory${this.category_id}`
    categoryLi.innerText = Category.findCategory('id', this.category_id).name
    let ul = document.createElement('ul')
    categoryLi.appendChild(ul)
    itemsLocation.appendChild(categoryLi);
    return ul;
  } else {
    let ul = itemsLocation.querySelector(`#menuCategory${this.category_id}`).children[0]
    return ul;
  }
  }

  displayItemInNewMenu(){
    let li = document.createElement('li')
    li.className = 'item'
    li.id = `item_${this.id}`
    li.innerText=this.name

    let input= document.createElement('input')
    input.type='hidden'
    input.name='menuItem'
    input.value = this.id

    let removeButton = document.createElement('button')
    removeButton.className = `removeItemFromMenu`
    removeButton.id = this.id
    removeButton.innerText = '✘'

    removeButton.style ="align: right;"
    li.appendChild(input)
    li.appendChild(removeButton)

    return li;
  }


  addItemToMenu(){
    let newRow = this.displayItemInNewMenu()
    let itemCategory = this.findOrCreateItemCategoryInNewMenu();
    itemCategory.appendChild(newRow);
  }

  addItemToEditMenu(){
    let newRow = this.displayItemInNewMenu()
    // debugger
    let editMenuForm = document.querySelector('.editMenuForm')
    let itemsLocation = editMenuForm.querySelector('#menuItemsList')
    let itemCategory = this.findOrCreateItemCategoryInNewMenu(itemsLocation);
    itemCategory.appendChild(newRow);
  }
}
