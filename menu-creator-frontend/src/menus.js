class Menu {

  static all_menus = []

  constructor(name,id, items) {
    this.name = name;
    this.id = id;
    this.items = items
    Menu.all_menus.push(this)
  }

  displayMenu(){
    let li = document.createElement('li')
    li.className = 'menu'
    li.id = `menu_${this.id}`

    let link = document.createElement('a')
    link.setAttribute('href',`${MENUS_URL}/${this.id}`)
    link.innerText=`${this.name} `
    link.className = 'menuLink'

    let deleteButton = document.createElement('button')
    deleteButton.className = `deleteMenu`
    deleteButton.id = this.id
    deleteButton.innerText = '✘'
    deleteButton.style ="align: right;"

    let editButton = document.createElement('button')
    editButton.className = `editMenu`
    editButton.id = this.id
    editButton.innerText = '✎'
    editButton.style ="right;"

    li.appendChild(link)

    li.appendChild(deleteButton)
    li.appendChild(editButton)
    return li;
  }

  static findMenu(value) {
    return (this.all_menus.find(element=>{return element.id===value}))
  }

  showMenu(){
    let printAndPreviewElements = Array.from(document.getElementsByClassName('printAndPreviewColumn'))
    printAndPreviewElements.forEach((item) => {
      item.style.display='block'
    });
    let oldMenu = Array.from(menuPreview.children).slice(2)
    oldMenu.forEach((item) => {
      menuPreview.removeChild(item)
    });

    const menuNamePlaceholder = document.querySelector('#menuNamePlaceholder')
    menuNamePlaceholder.innerText= this.name

    // printMenu.id= this.id

    this.items.forEach((itemId) => {
      let item = Item.findItem('id',itemId)
      let itemCategory = Category.findCategory('id',item.category_id)

      let categoryNamePlaceholder = document.getElementById(`${itemCategory.name}`)
      if (!categoryNamePlaceholder) {
        categoryNamePlaceholder=document.getElementById('templateCategoryPlaceholder').cloneNode(true)
        categoryNamePlaceholder.id = `${itemCategory.name}`
        categoryNamePlaceholder.firstElementChild.innerText = itemCategory.name
        menuPreview.appendChild(categoryNamePlaceholder)
      }

      let itemPlaceholder= document.querySelector('.itemPlaceholder').cloneNode(true)

      itemPlaceholder.children[0].innerText = item.name
      itemPlaceholder.children[1].innerText = item.description
      itemPlaceholder.children[2].innerText = item.price
      menuPreview.appendChild(itemPlaceholder)

    });
  }

  static hideMenu() {
    let printAndPreviewElements = Array.from(document.getElementsByClassName('printAndPreviewColumn'))
    printAndPreviewElements.forEach((item) => {
      item.style.display='none'
    });
  }

  static printMenu(menu){
    let newWin= window.open("");
    newWin.document.write(menu.outerHTML);
    newWin.print();
    newWin.close();
  }

  static createNewMenu(form) {

    const newMenuName = form.name.value;
    const menuItems = []

    if (form.menuItem) {
        if (form.menuItem.value) {
          menuItems.push({'item_id': parseInt(form.menuItem.value,10)});
        } else {
        form.menuItem.forEach((item) => {
          menuItems.push({'item_id': parseInt(item.value,10)});
        });
        }
    }
    const data = { name: newMenuName, menu_items_attributes: menuItems};
    createNewMenuInDB(data)
  }

  static showNewMenu(name,id,items){
    let newMenu = new Menu(name,id,items)
    let newRow = newMenu.displayMenu()
    menusList.appendChild(newRow);
  }

  removeMenu(res){
    if (res==='Menu Deleted.') {
    Menu.all_menus= Menu.all_menus.filter(element=>element.id != this.id)
    let deletedMenu = document.querySelector(`#menu_${this.id}`)
    deletedMenu.innerText=res;
    deletedMenu.className = 'deleted'
    setTimeout(function (){menusList.removeChild(deletedMenu)},1000);
    } else {
      window.alert(res);
    }
  }

  editMenu(){

    // let editMenuField = document.querySelector(`#menu_${this.id}`)
    menusList.style.display='none'
    const addItemButtons = Array.from(document.querySelectorAll('.addItemToEditMenu'))
    addItemButtons.forEach((item) => {
      item.style.display='block'
    });

    let editMenuForm = addNewMenuForm.cloneNode(true)
    const menusColumn=document.querySelector('#menusColumn')
    // editMenuForm.style.display='block'
    editMenuForm.className= 'editMenuForm'
    editMenuForm.id = `editMenu_${this.id}`

    menusColumn.appendChild(editMenuForm)

    this.items.forEach((item) => {
      let menuItem = Item.findItem('id',item)
      menuItem.addItemToEditMenu()
    });
    const inputName = editMenuForm.querySelector('#newMenuName')
    inputName.name = 'editMenuName'
    inputName.value=`${this.name}`

    const formButton=editMenuForm.querySelector('#submit')
    formButton.value = 'Update'

    // editMenuField.children[2].remove()
    // editMenuField.children[1].remove()
    // editMenuField.children[0].replaceWith(editMenuForm)

    // editMenuForm.style.display='block'
    // showAllMenus.style.display='inline'
    // menusList.style.display='none'
  }

  updateMenu(form) {
    const editedMenuName = form.editMenuName.value;
    const menuItems = []

    if (form.menuItem) {
        if (form.menuItem.value) {
          menuItems.push({'item_id': parseInt(form.menuItem.value,10)});
        } else {
        form.menuItem.forEach((item) => {
          menuItems.push({'item_id': parseInt(item.value,10)});
        });
        }
    }
    const data = { name: editedMenuName, menu_items_attributes: menuItems};
    updateMenuInDB(this.id,data)
    document.querySelector(`#editMenu_${this.id}`).parentNode.removeChild(document.querySelector(`#editMenu_${this.id}`))
  }
}
