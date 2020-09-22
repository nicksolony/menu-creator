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

  displayCategory(category){
    let tr = document.createElement('tr')
    let td = document.createElement('td')
    td.className = 'dishCategory'
    td.id = this.id
    td.innerText=this.name
    tr.appendChild(td)
    dishTable.appendChild(tr);
  }

}
