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

}
