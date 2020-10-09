# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#   Seeding Categories
# Category.create(name:'Desserts');
# Category.create(name:'Appetizers');
# Category.create(name:'Entrees');
# Category.create(name:'Drinks');
#
# #   Seeding DISHES_URL
# Item.create(name:'Pumpkin Cheesecake', description:'Pumpkin Cheesecake topped with caramel sauce. Served with whipped cream.' ,price:7 ,category_id:1);
# Item.create(name:'Chocolate Cake', description:'Our best seller! Home-made all chocolate cake made on premises.' ,price:5 ,category_id:1 );
# Item.create(name:'Chicken Fingers', description:'All white meat chicken tenders, lightly breaded and crispy fried. Served with honey mustard.' ,price:11 ,category_id:2 );
# Item.create(name:'Mozzarella Sticks', description:'Lightly breaded mozzarella sticks fried to a golden brown and served with marinara sauce.' ,price:8.5 ,category_id:2 );
# Item.create(name:'Snapple', description:'' ,price:3 ,category_id:4 );
#
#
# Menu.create(name:'Test');
# Menu.create(name:'Test2');
#
#
# MenuItem.create(menu_id: 1, item_id:1)
# MenuItem.create(menu_id: 1, item_id:2)
# MenuItem.create(menu_id: 1, item_id:3)
# MenuItem.create(menu_id: 2, item_id:1)
# MenuItem.create(menu_id: 2, item_id:3)
# MenuItem.create(menu_id: 2, item_id:4)
# MenuItem.create(menu_id: 2, item_id:5)


#SEEDING Categories
Category.create(name:'Desserts');
Category.create(name:'Appetizers');
Category.create(name:'Entrees');
Category.create(name:'Drinks');
Category.create(name:'Soup');
Category.create(name:'Salad');
Category.create(name:'Seafood');


#SEEDING ITEMS
Item.create(name:"Pumpkin Cheesecake", description:"Pumpkin Cheesecake topped with caramel sauce. Served with whipped cream." ,price:7 ,category_id:1);
Item.create(name:"Tiramisu", description:"The classic Italian dessert. A layer of creamy custard set atop espresso-soaked ladyfingers." ,price:7 ,category_id:1);
Item.create(name:"Chocolate Brownie Lasagna", description:"Eight decadent layers of rich, fudgy brownie and sweet vanilla cream cheese frosting, topped with chocolate shavings and a chocolate drizzle." ,price:8 ,category_id:1);
Item.create(name:"Chicken Alfredo", description:"Not everyone knows our signature alfredo sauce is made from scratch daily. This homemade sauce combines simple, fresh ingredients like butter, cream and parmesan cheese to make a rich topping to our fettuccine pasta. Then it is topped with tender, sliced grilled chicken. Sprinkle some parsley flakes on top and buon appetito! Olive Garden's classic Chicken Alfredo is an easy and delicious choice for dinner." ,price:17 ,category_id:3);
Item.create(name:"Shrimp Scampi", description:"Shrimp sautéed in a garlic sauce, tossed with asparagus, tomatoes, and angel hair pasta." ,price:17 ,category_id:7);
Item.create(name:"Herb-Grilled Salmon", description:"Filet grilled to perfection and topped with garlic herb butter. Served with parmesan garlic broccoli." ,price:23 ,category_id:7);
Item.create(name:"Steak Alfredo", description:"Grilled 6 oz sirloin topped with garlic herb butter. Served with fettuccine alfredo." ,price:17 ,category_id:3);
Item.create(name:"Lasagna", description:"Prepared fresh daily with layers of pasta, parmesan, mozzarella, pecorino romano and our homemade meat sauce." ,price:15 ,category_id:3);
Item.create(name:"Fried Mozzarella", description:"Fried mozzarella cheese with marinara sauce." ,price:7 ,category_id:2);
Item.create(name:"Calamari", description:"Calamari has a NEW RECIPE! Tender calamari, lightly breaded and fried. Served with marinara sauce and NEW spicy ranch." ,price:10 ,category_id:2);
Item.create(name:"Toasted Ravioli", description:"Ligtly fried ravioli filled with seasoned beef. Served with marinara sauce." ,price:8 ,category_id:2);
Item.create(name:"Classic Lemonade", description:"" ,price:3 ,category_id:4);
Item.create(name:"Raspberry Lemonade", description:"" ,price:3 ,category_id:4);
Item.create(name:"Fresh Brewed Iced Tea", description:"" ,price:3 ,category_id:4);
Item.create(name:"Garlic Bread", description:"Italian bread prepared with our special garlic butter." ,price:2 ,category_id:2);
Item.create(name:"Burrata Tartufo", description:"Creamy Mozzarela Cheese infused in Truffle Oil and served over Baby Arugula with Truffled Balsamic Reduction" ,price:14 ,category_id:2);
Item.create(name:"Mussels", description:"Mussels with White Wine, Garlic and Oil" ,price:11 ,category_id:2);
Item.create(name:"Souvlaki Sandwich", description:"" ,price:9 ,category_id:3);
Item.create(name:"Caesar", description:"Crispy romaine hearts, creamy Parmesan dressing" ,price:12 ,category_id:6);
Item.create(name:"Iceberg Wedge", description:"Beefsteak tomato, bacon chips, roasted grapes, maytag blue and ranch dressing" ,price:10 ,category_id:6);
Item.create(name:"Roasted Beet Salad", description:"Roasted Beet Salad with blue cheese croutons" ,price:9 ,category_id:6);

#seeding menus

Menu.create(name:'Desserts Menu');
Menu.create(name:'Today’s Specials');
Menu.create(name:'Italian Day');


#seeding menu_items

MenuItem.create(menu_id: 1, item_id:1);
MenuItem.create(menu_id: 1, item_id:2);
MenuItem.create(menu_id: 1, item_id:3);
MenuItem.create(menu_id: 1, item_id:12);
MenuItem.create(menu_id: 1, item_id:13);
MenuItem.create(menu_id: 1, item_id:14);
MenuItem.create(menu_id: 2, item_id:9);
MenuItem.create(menu_id: 2, item_id:10);
MenuItem.create(menu_id: 2, item_id:16);
MenuItem.create(menu_id: 2, item_id:19);
MenuItem.create(menu_id: 2, item_id:6);
MenuItem.create(menu_id: 2, item_id:7);
MenuItem.create(menu_id: 2, item_id:2);
MenuItem.create(menu_id: 2, item_id:3);
MenuItem.create(menu_id: 2, item_id:12);
MenuItem.create(menu_id: 2, item_id:13);
MenuItem.create(menu_id: 3, item_id:2);
MenuItem.create(menu_id: 3, item_id:4);
MenuItem.create(menu_id: 3, item_id:7);
MenuItem.create(menu_id: 3, item_id:8);
MenuItem.create(menu_id: 3, item_id:9);
MenuItem.create(menu_id: 3, item_id:11);
MenuItem.create(menu_id: 3, item_id:16);
MenuItem.create(menu_id: 3, item_id:19);
MenuItem.create(menu_id: 3, item_id:20);
MenuItem.create(menu_id: 3, item_id:13);
MenuItem.create(menu_id: 3, item_id:14);
