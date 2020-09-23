# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#   Seeding Categories
Category.create(name:'Desserts');
Category.create(name:'Appetizers');
Category.create(name:'Entrees');
Category.create(name:'Drinks');

#   Seeding DISHES_URL
Dish.create(name:'Apple Pie', description:'Home-made Apple Pie. Baked on premises.' ,price:5 ,category_id:1 );
Dish.create(name:'Chocolate Cake', description:'Our best seller! Home-made all chocolate cake made on premises.' ,price:5 ,category_id:1 );
Dish.create(name:'Chicken Fingers', description:'All white meat chicken tenders, lightly breaded and crispy fried. Served with honey mustard.' ,price:11 ,category_id:2 );
Dish.create(name:'Mozzarella Sticks', description:'Lightly breaded mozzarella sticks fried to a golden brown and served with marinara sauce.' ,price:8.5 ,category_id:2 );
Dish.create(name:'Snapple', description:'' ,price:3 ,category_id:4 );
