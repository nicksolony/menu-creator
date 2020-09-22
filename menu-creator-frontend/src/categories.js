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
    let li = document.createElement('li')
    li.className = 'dishCategory'
    li.id = this.id
    li.innerText=this.name
    categoriesList.appendChild(li);
  }

}
