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
}
