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

  static createNewCategory(e) {
    const form = e.target.parentNode;
    const newCategory = form.newCategory.value;
    const data = { name: newCategory };
    // debugger
    let row = form.parentNode
    row.parentNode.removeChild(row)
    fetch(`${BACKEND_URL}/categories`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => { if (!response.ok) {return response.json().then (data=> {throw data}) }
  return response.json() })
    .then(data => {
      console.log(data);
      const addedCategory = new Category(data.name, data.id);
      addedCategory.displayCategory();
    })
    .catch((error) => {
      window.alert(error)
    })
  }

}
