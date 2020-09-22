
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


    // fetch(`${BACKEND_URL}/categories`),{
    //   method: 'POST',
    //    headers: {
    //     'content-type': 'application/json'
    //    },
    //    body: JSON.stringify({name: newCategory})
    //  }
    //  .then(resp=>resp.json())
    //  .then(data=>{
    //    const addedCategory = new Category(data.name, data.id);
    //    addedCategory.displayCategory();
    //  })
    const data = { name: newCategory };

    fetch(`${BACKEND_URL}/categories`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      const addedCategory = new Category(data.name, data.id);
      addedCategory.displayCategory();
    })
    .catch((error) => {
      alert(error);
    });
  }
})
