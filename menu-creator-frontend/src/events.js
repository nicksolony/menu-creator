
window.addEventListener('DOMContentLoaded',(e)=>{
  fetch (`${BACKEND_URL}/categories`)
    .then (resp=>resp.json())
    .then (data=> {
      Category.all_categories=[]
      data.forEach((item) => {
          let newCategory = new Category(item.name,item.id)
          newCategory.displayCategory()
      });
    });
})

window.addEventListener('click',(e)=>{
  if (e.target.id === 'addCategory') {
    createAddCategoryButton();
  };

  if (e.target.id === 'AddCategoryButton') {
    e.preventDefault();
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
})
