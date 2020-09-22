// fetch addCategory(body) {
//   fetch(`${BACKEND_URL}/categories`),{
//     method: 'POST',
//      headers: {
//       'content-type': 'application/json'
//      },
//      body: JSON.stringify(body)
//    })
//    .then(resp=>resp.json())
//    .then(data=>{
//      const addedCategory = new Category(data.name, data.id)
//      addedCategory.displayCategory();
//    })
//   }
// }
