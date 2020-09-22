class Category {
  static all_categories = []
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }

  static findCategory(key,value) {
    return (this.all_categories.find(element=>{return element[key]===value}))
  }
}
